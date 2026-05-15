<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$type = trim((string)($_POST['type'] ?? 'contact'));
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$location = trim((string)($_POST['location'] ?? ''));

if ($name === '' || $phone === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Name, phone, and message are required']);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

$smtpHost = getenv('CALLTECH_SMTP_HOST') ?: '';
$smtpUser = getenv('CALLTECH_SMTP_USER') ?: '';
$smtpPass = getenv('CALLTECH_SMTP_PASS') ?: '';
$mailTo = getenv('CALLTECH_MAIL_TO') ?: '';
$mailFrom = getenv('CALLTECH_MAIL_FROM') ?: $smtpUser;

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $mailTo === '' || $mailFrom === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Mail service is not configured']);
    exit;
}

$body = [
    'Lead type' => $type,
    'Name' => $name,
    'Phone' => $phone,
    'Email' => $email,
    'Service' => $service,
    'Location' => $location,
    'Message' => $message,
    'Page' => $_SERVER['HTTP_REFERER'] ?? '',
    'Submitted at' => gmdate('Y-m-d H:i:s') . ' UTC',
];

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int)(getenv('CALLTECH_SMTP_PORT') ?: 587);

    $mail->setFrom($mailFrom, 'CallTech Website');
    $mail->addAddress($mailTo, 'CallTech');
    if ($email !== '') {
        $mail->addReplyTo($email, $name);
    }

    $mail->isHTML(false);
    $mail->Subject = 'New CallTech website lead';
    $mail->Body = implode("\r\n", array_map(
        static fn($key, $value): string => $key . ': ' . $value,
        array_keys($body),
        $body
    ));

    $mail->send();
    echo json_encode(['ok' => true, 'message' => 'Message has been sent']);
} catch (Exception $exception) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Message could not be sent']);
}
