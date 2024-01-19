<?php

$dsn = "mysql:host=10.115.2.38;dbname=Quizzard";
$dbusername = "root";
$dbpassword = "12345678";

try {
    $pdo = new PDO($dsn,$dbusername,$dbpassword);
    $pdo->setAttribute(PDO::ATTR_USERMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    echo "No connection: " . $e->getMessage();

}