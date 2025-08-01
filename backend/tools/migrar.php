<?php
require_once __DIR__ . '/../config/database.php';

$pdo = getPDO(); // <--- Esta línea faltaba

function esHash($string) {
    // Heurística para detectar si ya está hasheado (60 caracteres bcrypt)
    return strlen($string) === 60 && preg_match('/^\$2y\$/', $string);
}

try {
    $stmt = $pdo->query("SELECT id, password FROM usuario");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($usuarios as $usuario) {
        $id = $usuario['id'];
        $password = $usuario['password'];

        if (!esHash($password)) {
            $nuevoHash = password_hash($password, PASSWORD_DEFAULT);

            $update = $pdo->prepare("UPDATE usuario SET password = ? WHERE id = ?");
            $update->execute([$nuevoHash, $id]);

            echo "✅ Contraseña actualizada para usuario ID: $id\n";
        } else {
            echo "🔒 Usuario ID: $id ya tiene contraseña hasheada.\n";
        }
    }

    echo "\n🚀 Proceso de migración completado.\n";
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
