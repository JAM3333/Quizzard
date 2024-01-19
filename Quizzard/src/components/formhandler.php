<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "Test"
    $username = $_POST["username"];
    $email = $_POST["email"];
    $pwd = $_POST["password"];
    echo $username
    try {
        require_once "db.php";
        $query = "INSERT INTO Users (Username,Email,UserPassword) VALUES ($username,$email,$pwd);"
    } catch (PDOException $e) {
        die("Query faild:" . $e->getMessage());
    }
} else {
    header("Location")
}
