<?php
declare(strict_types=1);

use Dotenv\Dotenv;

require_once __DIR__ . '/../../vendor/autoload.php'; // Asegura que cargue Dotenv

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

function getPDO(): PDO {
    $dsn = "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4";
    return new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
}
