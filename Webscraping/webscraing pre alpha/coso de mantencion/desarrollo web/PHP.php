<?php
$host = 'mysql.inf.uct.cl';
$db = 'A2023_ccaceres';
$user = 'ccaceres';
$pass = 'CGwaf3hKmYWQRQ7oz';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die('Error al conectar a la base de datos: ' . $e->getMessage());
}

$stmt = $pdo->query('SELECT * FROM review');
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($results);
?>
