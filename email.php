<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

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

function clean_header_value(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
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

$smtpHost = getenv('CALLTECH_SMTP_HOST') ?: '';
$smtpUser = getenv('CALLTECH_SMTP_USER') ?: '';
$smtpPass = getenv('CALLTECH_SMTP_PASS') ?: '';
$smtpPort = (int)(getenv('CALLTECH_SMTP_PORT') ?: 587);
$mailTo = getenv('CALLTECH_MAIL_TO') ?: '';
$mailFrom = getenv('CALLTECH_MAIL_FROM') ?: $smtpUser;
$mailFromName = getenv('CALLTECH_MAIL_FROM_NAME') ?: 'CallTech Website';

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $mailTo === '' || $mailFrom === '') {
    respond(500, false, 'Mail service is not configured.');
}

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoloadPath)) {
    respond(500, false, 'Mail dependencies are not installed.');
}

require $autoloadPath;

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

$bodyLines = [];
foreach ($lead as $key => $value) {
    $bodyLines[] = $key . ': ' . $value;
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom(clean_header_value($mailFrom), clean_header_value($mailFromName));
    $mail->addAddress(clean_header_value($mailTo), 'CallTech');
    $mail->addReplyTo(clean_header_value($email), clean_header_value($name));

    $mail->isHTML(false);
    $mail->Subject = 'New CallTech quote request: ' . clean_header_value($service);
    $mail->Body = implode("\r\n", $bodyLines);

    $mail->send();
    respond(200, true, 'Thank you. Your request was sent and we will follow up shortly.');
} catch (Exception $exception) {
    respond(500, false, 'Message could not be sent. Please call us or try again later.');
}
