<?php

declare(strict_types=1);

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use App\Repositories\UserRepository;


require_once __DIR__ . '/../repositories/UserRepository.php';

class UserController
{
    private UserRepository $repo;

    public function __construct()
    {
        $this->repo = new UserRepository();
    }

    // -- Renombrado de list() a listUsers() --
    public function listUsers(Request $req, Response $res, array $args): Response
    {
        $users = $this->repo->all();
        $res->getBody()->write(json_encode($users));
        return $res->withHeader('Content-Type', 'application/json');
    }

    // Es buena idea renombrar también get() y create() para evitar confusiones:
    public function getUser(Request $req, Response $res, array $args): Response
    {
        $user = $this->repo->find((int)$args['id']);
        if (!$user) {
            return $res->withStatus(404);
        }
        $res->getBody()->write(json_encode($user));
        return $res->withHeader('Content-Type', 'application/json');
    }

    public function createUser(Request $req, Response $res): Response
    {
        $data = (array)$req->getParsedBody();

        try {
            $ids = $this->repo->create($data);
            $res->getBody()->write(json_encode($ids));
            return $res->withHeader('Content-Type', 'application/json')->withStatus(201);
        } catch (\RuntimeException $e) {
            $res->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $res
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getCode() ?: 400);
        }
    }


    public function changeRole(Request $req, Response $res, array $args): Response
    {
        $data = (array)$req->getParsedBody();
        $rol = $data['rol'] ?? null;
        if (!$rol) {
            $res->getBody()->write(json_encode(['error' => 'Falta "rol"']));
            return $res->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
        $this->repo->updateRole((int)$args['id'], $rol);
        return $res->withStatus(204);
    }

    public function resetPassword(Request $req, Response $res, array $args): Response
    {
        $data = (array)$req->getParsedBody();
        $pwd = $data['password'] ?? null;
        if (!$pwd) {
            $res->getBody()->write(json_encode(['error' => 'Falta "password"']));
            return $res->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
        $this->repo->resetPassword((int)$args['id'], $pwd);
        return $res->withStatus(204);
    }

    public function deactivate(Request $req, Response $res, array $args): Response
    {
        $this->repo->deactivate((int)$args['id']);
        return $res->withStatus(204);
    }
}
