<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "mindentudas_db";

$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) die(json_encode(["error" => "Kapcsolódási hiba"]));

$conn->query("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci");
$conn->select_db($db);
$conn->set_charset("utf8mb4");

$conn->query("CREATE TABLE IF NOT EXISTS tudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    terulet VARCHAR(255)
) ENGINE=InnoDB");

$conn->query("CREATE TABLE IF NOT EXISTS eloadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cim VARCHAR(255) NOT NULL,
    ido DATE
) ENGINE=InnoDB");

$conn->query("CREATE TABLE IF NOT EXISTS kapcsolo (
    tudosid INT NOT NULL,
    eloadasid INT NOT NULL,
    PRIMARY KEY (tudosid, eloadasid),
    FOREIGN KEY (tudosid) REFERENCES tudos(id) ON DELETE CASCADE,
    FOREIGN KEY (eloadasid) REFERENCES eloadas(id) ON DELETE CASCADE
) ENGINE=InnoDB");

$checkTudos = $conn->query("SELECT id FROM tudos LIMIT 1");
if ($checkTudos->num_rows == 0 && file_exists(__DIR__ . '/tudos.txt')) {
    $lines = file(__DIR__ . '/tudos.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $stmt = $conn->prepare("INSERT INTO tudos (id, nev, terulet) VALUES (?, ?, ?)");
    $first = true;
    foreach ($lines as $line) {
        if ($first) { $first = false; continue; }
        $data = explode("\t", $line);
        if (count($data) >= 2) {
            $id = intval(trim($data[0]));
            $nev = trim($data[1]);
            $terulet = isset($data[2]) ? trim($data[2]) : '';
            $stmt->bind_param("iss", $id, $nev, $terulet);
            $stmt->execute();
        }
    }
    $stmt->close();
}

$checkEloadas = $conn->query("SELECT id FROM eloadas LIMIT 1");
if ($checkEloadas->num_rows == 0 && file_exists(__DIR__ . '/eloadas.txt')) {
    $lines = file(__DIR__ . '/eloadas.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $stmt = $conn->prepare("INSERT INTO eloadas (id, cim, ido) VALUES (?, ?, ?)");
    $first = true;
    foreach ($lines as $line) {
        if ($first) { $first = false; continue; }
        $data = explode("\t", $line);
        if (count($data) >= 2) {
            $id = intval(trim($data[0]));
            $cim = trim($data[1]);
            $ido = trim($data[2]);
            $formazottIdo = str_replace('.', '-', $ido);
            $stmt->bind_param("iss", $id, $cim, $formazottIdo);
            $stmt->execute();
        }
    }
    $stmt->close();
}

$checkKapcsolo = $conn->query("SELECT tudosid FROM kapcsolo LIMIT 1");
if ($checkKapcsolo->num_rows == 0 && file_exists(__DIR__ . '/kapcsolo.txt')) {
    $lines = file(__DIR__ . '/kapcsolo.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $stmt = $conn->prepare("INSERT INTO kapcsolo (tudosid, eloadasid) VALUES (?, ?)");
    $first = true;
    foreach ($lines as $line) {
        if ($first) { $first = false; continue; }
        $data = explode("\t", $line);
        if (count($data) >= 2) {
            $tid = intval(trim($data[0]));
            $eid = intval(trim($data[1]));
            $stmt->bind_param("ii", $tid, $eid);
            $stmt->execute();
        }
    }
    $stmt->close();
}
?>