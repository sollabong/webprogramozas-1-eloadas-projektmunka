<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

require_once 'database-config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['type']) && $_GET['type'] == 'statisztika') {
            $sql = "SELECT t.nev, COUNT(k.eloadasid) AS eloadas_szam 
                    FROM tudos t 
                    LEFT JOIN kapcsolo k ON t.id = k.tudosid 
                    GROUP BY t.id ORDER BY eloadas_szam DESC";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        else if (isset($_GET['kereses'])) {
            $s = "%" . $conn->real_escape_string($_GET['kereses']) . "%";
            $sql = "SELECT * FROM tudos WHERE nev LIKE ? OR terulet LIKE ? ORDER BY nev";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $s, $s);
            $stmt->execute();
            echo json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
        } 
        else {
            $sql = "SELECT * FROM tudos ORDER BY id DESC";
            $result = $conn->query($sql);
            echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        }
        break;

    case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);
    
    $stmt = $conn->prepare("INSERT INTO tudos (nev, terulet) VALUES (?, ?)");
    $stmt->bind_param("ss", $data['nev'], $data['terulet']);
    
    if($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $conn->insert_id]);
    }
    break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $sql = "UPDATE tudos SET nev=?, terulet=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $data['nev'], $data['terulet'], $data['id']);
        
        if($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
        break;

    case 'DELETE':
        if(isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("DELETE FROM tudos WHERE id = ?");
            $stmt->bind_param("i", $id);
            
            if($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false]);
            }
        }
        break;
}

$conn->close();
?>