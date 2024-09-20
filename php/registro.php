<?php
    include 'conexion_be.php';

    // Capturar los datos cuando se envíen
    $nombre = htmlspecialchars($_POST['nombre']);
    $correo = htmlspecialchars($_POST['correo']);
    $contrasena = htmlspecialchars($_POST['contrasena']);
    $conf = htmlspecialchars($_POST['confirmacion_contrasena']);

    // Verificar que la contraseña y su confirmación coincidan
    if ($contrasena !== $conf) {
        die('Las contraseñas no coinciden.');
    }

    // Variable que contiene la consulta SQL
    $query = "INSERT INTO Usuario (Nombre_Usuario, correo_Usuario, Contrasena_Usuario)
              VALUES ('$nombre', '$correo', '$contrasena')";

    // Ejecutar la consulta
    $ejecutar = mysqli_query($conn, $query);

    if ($ejecutar) {
        header('Location: ../login.html?registro=exitoso');
    } else {
        echo 'Error al registrar usuario: ' . mysqli_error($conn);
    }

    // Cerrar la conexión
    mysqli_close($conn);
?>
