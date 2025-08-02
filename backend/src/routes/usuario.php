<?php
// src/routes/usuario.php

// 1) Incluye a mano el controlador (y cualquier helper)
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../helpers/jwt.php';
require_once __DIR__ . '/../helpers/JwtMiddleware.php';
require_once __DIR__ . '/../helpers/RoleMiddleware.php';

use Slim\App;
use App\Controllers\UserController;
use App\Helpers\JwtMiddleware;
use App\Helpers\RoleMiddleware;

return function(App $app): void {
    $controller = new UserController();

    $app->group('/users', function($g) use ($controller) {
        $g->get('',               [$controller, 'listUsers']);
        $g->get('/{id}',          [$controller, 'getUser']);
        $g->post('',              [$controller, 'createUser']);
        $g->put('/{id}/role',     [$controller, 'changeRole']);
        $g->put('/{id}/password', [$controller, 'resetPassword']);
        $g->patch('/{id}/deactivate', [$controller, 'deactivate']);
    })
    ->add(new RoleMiddleware(['admin']))
    ->add(new JwtMiddleware());
};
