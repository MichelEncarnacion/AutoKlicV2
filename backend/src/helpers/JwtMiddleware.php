<?php
namespace App\Helpers;

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Response;

// incluimos tus funciones de jwt
require_once __DIR__ . '/jwt.php';

class JwtMiddleware implements MiddlewareInterface
{
    public function process(Request $request, Handler $handler): ResponseInterface
    {
        // 1) Extraemos el header Authorization
        $authHeader = $request->getHeaderLine('Authorization');
        if (!preg_match('/Bearer\s+(.+)$/i', $authHeader, $matches)) {
            $res = new Response();
            $res->getBody()->write(json_encode(['error' => 'Token no proporcionado']));
            return $res
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }

        // 2) Verificamos el token
        $token = $matches[1];
        $userData = verificarToken($token);
        if (!$userData) {
            $res = new Response();
            $res->getBody()->write(json_encode(['error' => 'Token inválido o expirado']));
            return $res
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }

        // 3) Inyectamos los datos de usuario en el request
        $request = $request->withAttribute('user', $userData);

        // 4) Continuamos la cadena de middleware
        return $handler->handle($request);
    }
}
