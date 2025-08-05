<?php

namespace App\Repositories;

use PDO;
// Asegúrate de que getPDO() 
require_once __DIR__ . '/../config/database.php';

class UserRepository
{
    private PDO $db;

    public function __construct()
    {
        // Tira directo de tu factory
        $this->db = getPDO();
    }

    public function all(): array
    {
        $stmt = $this->db->query("SELECT id, username, rol, empleado_id, activo FROM usuario");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT id, username, rol, empleado_id, activo 
             FROM usuario 
             WHERE id = :id"
        );
        $stmt->execute([':id' => $id]);
        return $stmt->fetch() ?: null;
    }

    public function create(array $data): array
    {
        // 1) Validar campos mínimos
        foreach (['nombre', 'cargo', 'telefono', 'email', 'username', 'password', 'rol', 'empleado_id'] as $f) {
            // Nota: eliminamos 'empleado_id' porque lo generamos aquí
        }
        if (!in_array($data['rol'], ['admin', 'vendedor'], true)) {
            throw new \RuntimeException("Rol inválido", 400);
        }

        // 2) Iniciamos transacción
        $this->db->beginTransaction();
        try {
            // 3) Insertar empleado
            $stmtEmp = $this->db->prepare("
                INSERT INTO empleado (nombre, cargo, telefono, email)
                VALUES (:n, :c, :t, :e)
            ");
            $stmtEmp->execute([
                ':n' => $data['nombre'],
                ':c' => $data['cargo'],
                ':t' => $data['telefono'],
                ':e' => $data['email'],
            ]);
            $employeeId = (int)$this->db->lastInsertId();

            // 4) Insertar usuario
            $hash = password_hash($data['password'], PASSWORD_DEFAULT);
            $stmtUser = $this->db->prepare("
                INSERT INTO usuario (username, password, rol, empleado_id, activo)
                VALUES (:u, :p, :r, :e, 1)
            ");
            $stmtUser->execute([
                ':u' => $data['username'],
                ':p' => $hash,
                ':r' => $data['rol'],
                ':e' => $employeeId,
            ]);
            $userId = (int)$this->db->lastInsertId();

            // 5) Commit y retorno
            $this->db->commit();
            return [
                'employee_id' => $employeeId,
                'user_id'     => $userId,
            ];
        } catch (\PDOException $e) {
            $this->db->rollBack();

            // 1062 = Duplicate entry
            if (isset($e->errorInfo[1]) && $e->errorInfo[1] === 1062) {
                throw new \RuntimeException(
                    "Ya existe un registro duplicado: " . $e->errorInfo[2],
                    400
                );
            }

            throw new \RuntimeException("Error al crear empleado y usuario", 500);
        }
    }


    public function updateRole(int $id, string $rol): void
    {
        $stmt = $this->db->prepare("UPDATE usuario SET rol = :rol WHERE id = :id");
        $stmt->execute([':rol' => $rol, ':id' => $id]);
    }

    public function resetPassword(int $id, string $newPassword): void
    {
        $hash = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $this->db->prepare("UPDATE usuario SET password = :p WHERE id = :id");
        $stmt->execute([':p' => $hash, ':id' => $id]);
    }

    public function deactivate(int $id): void
    {
        $stmt = $this->db->prepare("UPDATE usuario SET activo = 0 WHERE id = :id");
        $stmt->execute([':id' => $id]);
    }
    public function activate(int $id): void
    {
        $sql = "UPDATE usuario
            SET activo = 1
            WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }
}
