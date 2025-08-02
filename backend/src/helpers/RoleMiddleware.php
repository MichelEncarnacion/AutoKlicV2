<?php
namespace App\Helpers;

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Response;

class RoleMiddleware implements MiddlewareInterface
{
    private array $allowedRoles;

    public function __construct(array $allowedRoles)
    {
        $this->allowedRoles = $allowedRoles;
    }

    public function process(Request $request, Handler $handler): ResponseInterface
    {
        $user = $request->getAttribute('user');
        // asumimos que en $user['rol'] está el rol
        if (!isset($user['rol']) || !in_array($user['rol'], $this->allowedRoles, true)) {
            $res = new Response();
            $res->getBody()->write(json_encode(['error' => 'Acceso denegado']));
            return $res
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(403);
        }
        return $handler->handle($request);
    }
}
