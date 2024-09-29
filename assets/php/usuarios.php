<?php

/*Aun no me atrevo a cambiar este archivo */
$host = 'localhost'; 
$usuario = 'root'; 
$contraseña = ''; 
$base_de_datos = 'bd'; 

try {
    $conexion = new mysqli($host, $usuario, $contraseña, $base_de_datos);
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    // Consultar la lista de usuarios
    $consulta = "SELECT ID_Usuario, Nombre_Usuario, correo_Usuario FROM Usuario";
    $resultado = $conexion->query($consulta);

    // Mostrar los usuarios en la tabla
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

    // Cerrar la conexión
    $conexion->close();

} catch (mysqli_sql_exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
