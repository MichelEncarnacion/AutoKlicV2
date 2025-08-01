<?php

declare(strict_types=1);

use Slim\App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/../config/database.php';

return function (App $app): void {

    // Obtener todos los vehículos
    $app->get('/vehiculos', function (Request $request, Response $response) {
        $pdo = getPDO();
        $stmt = $pdo->query("
        SELECT v.*, m.url AS imagen
        FROM vehiculo v
        LEFT JOIN multimedia m 
            ON m.vehiculo_id = v.id AND m.es_principal = true
        ORDER BY v.fecha_ingreso DESC
    ");
        $vehiculos = $stmt->fetchAll();

        $response->getBody()->write(json_encode($vehiculos));
        return $response->withHeader('Content-Type', 'application/json');
    });


    // Agregar un nuevo vehículo
    $app->post('/vehiculos', function (Request $request, Response $response) {
        $pdo = getPDO();
        $data = $request->getParsedBody();

        $stmt = $pdo->prepare("
            INSERT INTO vehiculo 
            (marca, modelo, año, color, tipo_combustible, transmision, precio, estado, kilometraje, tipo, fecha_ingreso)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $data['marca'],
            $data['modelo'],
            $data['año'],
            $data['color'],
            $data['tipo_combustible'],
            $data['transmision'],
            $data['precio'],
            $data['estado'],
            $data['kilometraje'],
            $data['tipo']
        ]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // Actualizar un vehículo
    $app->put('/vehiculos/{id}', function (Request $request, Response $response, $args) {
        $pdo = getPDO();
        $data = $request->getParsedBody();
        $id = (int)$args['id'];

        $stmt = $pdo->prepare("
            UPDATE vehiculo SET
            marca = ?, modelo = ?, año = ?, color = ?, tipo_combustible = ?, 
            transmision = ?, precio = ?, estado = ?, kilometraje = ?, tipo = ?
            WHERE id = ?
        ");
        $stmt->execute([
            $data['marca'],
            $data['modelo'],
            $data['año'],
            $data['color'],
            $data['tipo_combustible'],
            $data['transmision'],
            $data['precio'],
            $data['estado'],
            $data['kilometraje'],
            $data['tipo'],
            $id
        ]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // Eliminar un vehículo
    $app->delete('/vehiculos/{id}', function (Request $request, Response $response, $args) {
        $pdo = getPDO();
        $id = (int)$args['id'];

        $stmt = $pdo->prepare("DELETE FROM vehiculo WHERE id = ?");
        $stmt->execute([$id]);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    //Landig Page Autos
    $app->get('/landing/destacados', function (Request $request, Response $response) {
        $pdo = getPDO();
        $stmt = $pdo->query("
        SELECT v.id, v.marca, v.modelo, v.precio, m.url AS imagen
        FROM vehiculo v
        LEFT JOIN multimedia m ON m.vehiculo_id = v.id AND m.es_principal = true
        WHERE v.estado = 'Disponible'
        ORDER BY v.fecha_ingreso DESC
        LIMIT 6
    ");
        $resultados = $stmt->fetchAll();

        $response->getBody()->write(json_encode($resultados));
        return $response->withHeader('Content-Type', 'application/json');
    });


    
};
