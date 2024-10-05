<?php
include "conector.php";

// Verifica si se ha enviado una búsqueda
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Modifica la consulta SQL para incluir el criterio de búsqueda si se proporciona
$sql = "SELECT ID_Usuario, Nombre_Usuario, correo_Usuario FROM Usuario";

// Si el usuario ingresó algo en el buscador, agregar la condición de búsqueda
if ($search) {
    $sql .= " WHERE Nombre_Usuario LIKE '%" . $conn->real_escape_string($search) . "%'";
}

$sql .= " ORDER BY Nombre_Usuario ASC";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr>
                <td>{$fila['ID_Usuario']}</td>
                <td>{$fila['Nombre_Usuario']}</td>
                <td>{$fila['correo_Usuario']}</td>
                <td>
                    <a href='../php/editar_usuario.php?id={$fila['ID_Usuario']}'>Editar</a> | 
                    <a href='../php/eliminar_usuario.php?id={$fila['ID_Usuario']}'>Eliminar</a>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='4'>No se encontraron usuarios registrados.</td></tr>";
}

$conn->close();
?>
