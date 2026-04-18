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

$table = "";
if ($type === 'events') $table = 'eloadas';
if ($type === 'scientists') $table = 'tudos';

switch($method) {
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM $table WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $item = $stmt->get_result()->fetch_assoc();

            if ($item) {
                if ($type === 'scientists') {
                    $sql = "SELECT e.* FROM eloadas e 
                            JOIN kapcsolo k ON e.id = k.eloadasid 
                            WHERE k.tudosid = ?";
                    $s = $conn->prepare($sql);
                    $s->bind_param("i", $id);
                    $s->execute();
                    $item['connections'] = $s->get_result()->fetch_all(MYSQLI_ASSOC);
                } else {
                    $sql = "SELECT t.* FROM tudos t 
                            JOIN kapcsolo k ON t.id = k.tudosid 
                            WHERE k.eloadasid = ?";
                    $s = $conn->prepare($sql);
                    $s->bind_param("i", $id);
                    $s->execute();
                    $item['connections'] = $s->get_result()->fetch_all(MYSQLI_ASSOC);
                }
            }
            echo json_encode($item);
        } else {
            $result = $conn->query("SELECT * FROM $table ORDER BY id DESC");
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if ($type === 'assign') {
            $stmt = $conn->prepare("INSERT IGNORE INTO kapcsolo (tudosid, eloadasid) VALUES (?, ?)");
            $stmt->bind_param("ii", $data['tudosId'], $data['eloadasId']);
            if($stmt->execute()) echo json_encode(["success" => true]);
        } 
        else if ($type === 'events') {
            $stmt = $conn->prepare("INSERT INTO eloadas (cim, ido) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['cim'], $data['ido']);
            if($stmt->execute()) echo json_encode(["success" => true, "id" => $conn->insert_id]);
        } 
        else {
            $stmt = $conn->prepare("INSERT INTO tudos (nev, terulet) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['nev'], $data['terulet']);
            if($stmt->execute()) echo json_encode(["success" => true, "id" => $conn->insert_id]);
        }
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
        if ($type === 'assign') {
            $tId = intval($_GET['tId']);
            $eId = intval($_GET['eId']);
            $stmt = $conn->prepare("DELETE FROM kapcsolo WHERE tudosid = ? AND eloadasid = ?");
            $stmt->bind_param("ii", $tId, $eId);
        } else if ($id) {
            $stmt = $conn->prepare("DELETE FROM $table WHERE id = ?");
            $stmt->bind_param("i", $id);
        }
        if(isset($stmt) && $stmt->execute()) echo json_encode(["success" => true]);
        break;
}

$conn->close();
?>