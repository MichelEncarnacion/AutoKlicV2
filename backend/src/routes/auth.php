<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../helpers/jwt.php';

$app->post('/login', function (Request $request, Response $response) {
    $pdo = getPDO();
    $data = $request->getParsedBody();

    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Buscar usuario
    $stmt = $pdo->prepare("
        SELECT u.id, u.username, u.password, u.rol, u.empleado_id, e.nombre AS nombre_empleado
        FROM usuario u
        JOIN empleado e ON u.empleado_id = e.id
        WHERE u.username = ?
        LIMIT 1
    ");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $response->getBody()->write(json_encode(['error' => 'Usuario no encontrado']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
    }

    if (!password_verify($password, $user['password'])) {
        $response->getBody()->write(json_encode(['error' => 'Contraseña incorrecta']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
    }

    unset($user['password']);

    // Generar token JWT
    $token = generarToken($user);

    $response->getBody()->write(json_encode([
        'message' => 'Login exitoso',
        'token' => $token,
        'user' => $user
    ]));

    return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
});
