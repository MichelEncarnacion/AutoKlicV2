<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generarToken(array $datosUsuario): string {
    $clave = $_ENV['JWT_SECRET'] ?? 'clave_secreta_default';
    $payload = [
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24), // 24 horas
        'data' => $datosUsuario
    ];
    return JWT::encode($payload, $clave, 'HS256');
}

function verificarToken(string $jwt): ?array {
    try {
        $clave = $_ENV['JWT_SECRET'] ?? 'clave_secreta_default';
        $decoded = JWT::decode($jwt, new Key($clave, 'HS256'));
        return (array) $decoded->data;
    } catch (Exception $e) {
        return null;
    }
}
