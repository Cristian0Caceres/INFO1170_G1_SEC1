<?php
include "conector.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Actualizar usuario
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];

    $sql = "UPDATE Usuario SET Nombre_Usuario='$nombre', correo_Usuario='$correo' WHERE ID_Usuario=$id";
    if ($conn->query($sql) === TRUE) {
        header('Location: lista_usuarios.php'); 
        exit();
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
} else {
    // Obtener datos del usuario
    $id = $_GET['id'];
    $sql = "SELECT * FROM Usuario WHERE ID_Usuario=$id";
    $result = $conn->query($sql);
    $usuario = $result->fetch_assoc();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="../css/styles4.css"> <!-- Cambia la ruta según la ubicación de tu archivo CSS -->
</head>
<body>
    <h2>Editar Usuario</h2>
    <form method="post">
        <input type="hidden" name="id" value="<?php echo $usuario['ID_Usuario']; ?>">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" value="<?php echo $usuario['Nombre_Usuario']; ?>" required>
        <label for="correo">Correo:</label>
        <input type="email" name="correo" value="<?php echo $usuario['correo_Usuario']; ?>" required>
        <button type="submit">Actualizar</button>
    </form>
</body>
</html>
