<?php
include "conector.php";

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "DELETE FROM Usuario WHERE ID_Usuario=$id";

    if ($conn->query($sql) === TRUE) {
        header('Location: ../html/lista_usuarios.php'); 
        exit();
    } else {
        echo "Error al eliminar: " . $conn->error;
    }
} else {
    echo "ID de usuario no proporcionado.";
}

$conn->close();
?>
