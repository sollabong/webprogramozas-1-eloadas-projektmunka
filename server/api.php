<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

require_once 'database-config.php';

$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'] ?? '';
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

$table = ($type === 'events') ? 'eloadas' : 'tudos';

switch($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM $table WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode($stmt->get_result()->fetch_assoc());
        } else {
            $result = $conn->query("SELECT * FROM $table ORDER BY id DESC");
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if ($type === 'events') {
            $stmt = $conn->prepare("INSERT INTO eloadas (cim, ido) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['cim'], $data['ido']);
        } else {
            $stmt = $conn->prepare("INSERT INTO tudos (nev, terulet) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['nev'], $data['terulet']);
        }
        if($stmt->execute()) echo json_encode(["success" => true, "id" => $conn->insert_id]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        if ($type === 'events') {
            $stmt = $conn->prepare("UPDATE eloadas SET cim = ?, ido = ? WHERE id = ?");
            $stmt->bind_param("ssi", $data['cim'], $data['ido'], $data['id']);
        } else {
            $stmt = $conn->prepare("UPDATE tudos SET nev = ?, terulet = ? WHERE id = ?");
            $stmt->bind_param("ssi", $data['nev'], $data['terulet'], $data['id']);
        }
        if($stmt->execute()) echo json_encode(["success" => true]);
        break;

    case 'DELETE':
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM $table WHERE id = ?");
            $stmt->bind_param("i", $id);
            if($stmt->execute()) echo json_encode(["success" => true]);
        }
        break;
}

$conn->close();
?>