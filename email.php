<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $statusCode, bool $ok, string $message): void
{
    http_response_code($statusCode);
    echo json_encode([
        'ok' => $ok,
        'message' => $message,
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

function request_data(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $payload = json_decode((string)file_get_contents('php://input'), true);
        return is_array($payload) ? $payload : [];
    }

    return $_POST;
}

function field(array $data, string $key, int $maxLength): string
{
    $value = trim((string)($data[$key] ?? ''));
    $value = preg_replace('/[ \t]+/', ' ', $value) ?? '';
    return substr($value, 0, $maxLength);
}

function config_value(string $key): string
{
    static $fileConfig = null;

    $envValue = getenv($key);
    if (is_string($envValue) && $envValue !== '') {
        return $envValue;
    }

    if ($fileConfig === null) {
        $configPath = dirname(__DIR__) . '/calltech-telegram.env';
        $fileConfig = is_file($configPath) ? parse_ini_file($configPath, false, INI_SCANNER_RAW) : [];
        if (!is_array($fileConfig)) {
            $fileConfig = [];
        }
    }

    return trim((string)($fileConfig[$key] ?? ''));
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function telegram_message(array $lead): string
{
    $lines = [
        '<b>New CallTech quote request</b>',
        '',
        '<b>Service:</b> ' . escape_html($lead['Service']),
        '<b>Name:</b> ' . escape_html($lead['Name']),
        '<b>Phone:</b> ' . escape_html($lead['Phone']),
        '<b>Email:</b> ' . escape_html($lead['Email']),
        '<b>City / ZIP:</b> ' . escape_html($lead['City / ZIP']),
        '<b>Project details:</b>',
        escape_html($lead['Project details']),
        '',
        '<b>Lead type:</b> ' . escape_html($lead['Lead type']),
        '<b>Page:</b> ' . escape_html($lead['Page']),
        '<b>IP:</b> ' . escape_html($lead['IP address']),
        '<b>Submitted:</b> ' . escape_html($lead['Submitted at']),
    ];

    return implode("\n", $lines);
}

function post_to_telegram(string $botToken, string $chatId, string $message): bool
{
    $url = 'https://api.telegram.org/bot' . rawurlencode($botToken) . '/sendMessage';
    $payload = http_build_query([
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => 'true',
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n" .
                "Content-Length: " . strlen($payload) . "\r\n",
            'content' => $payload,
            'timeout' => 10,
            'ignore_errors' => true,
        ],
    ]);

    $response = file_get_contents($url, false, $context);
    if ($response === false) {
        return false;
    }

    $decoded = json_decode($response, true);
    return is_array($decoded) && ($decoded['ok'] ?? false) === true;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

$data = request_data();

if (field($data, 'company_website', 200) !== '') {
    respond(200, true, 'Thank you. Your request was sent and we will follow up shortly.');
}

$type = field($data, 'type', 40) ?: 'quote';
$name = field($data, 'name', 120);
$email = field($data, 'email', 160);
$phone = field($data, 'phone', 40);
$service = field($data, 'service', 120);
$location = field($data, 'location', 120);
$message = field($data, 'message', 2000);

$requiredFields = [
    'Full name' => $name,
    'Phone number' => $phone,
    'Email' => $email,
    'Service needed' => $service,
    'City or ZIP code' => $location,
    'Project details' => $message,
];

foreach ($requiredFields as $label => $value) {
    if ($value === '') {
        respond(422, false, $label . ' is required.');
    }
}

if (strlen($name) < 2) {
    respond(422, false, 'Please enter your name.');
}

if (!preg_match('/^[0-9+().\-\s]{7,}$/', $phone)) {
    respond(422, false, 'Please enter a valid phone number.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}

if (strlen($message) < 10) {
    respond(422, false, 'Please add a few project details.');
}

$botToken = config_value('CALLTECH_TELEGRAM_BOT_TOKEN');
$chatId = config_value('CALLTECH_TELEGRAM_CHAT_ID');

if ($botToken === '' || $chatId === '') {
    respond(500, false, 'Telegram notifications are not configured.');
}

$lead = [
    'Lead type' => $type,
    'Name' => $name,
    'Phone' => $phone,
    'Email' => $email,
    'Service' => $service,
    'City / ZIP' => $location,
    'Project details' => $message,
    'Page' => $_SERVER['HTTP_REFERER'] ?? '',
    'IP address' => $_SERVER['REMOTE_ADDR'] ?? '',
    'Submitted at' => gmdate('Y-m-d H:i:s') . ' UTC',
];

if (!post_to_telegram($botToken, $chatId, telegram_message($lead))) {
    respond(500, false, 'Message could not be sent. Please call us or try again later.');
}

respond(200, true, 'Thank you. Your request was sent and we will follow up shortly.');
