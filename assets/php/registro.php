<?php
    include 'conexion_be.php';

    // Capturar los datos cuando se envíen
    $nombre = htmlspecialchars($_POST['nombre']);
    $correo = htmlspecialchars($_POST['correo']);
    $contrasena = htmlspecialchars($_POST['contrasena']);
    $conf = htmlspecialchars($_POST['confirmacion_contrasena']);

    // Verificar que la contraseña y su confirmación coincidan
    if ($contrasena !== $conf) {
        header('Location: ../html/register.html?error=contrasenas_no_coinciden');
        exit();
    }

    // Verificar si el correo ya existe
    $query = "SELECT * FROM Usuario WHERE correo_Usuario = '$correo'";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        header('Location: ../html/register.html?error=correo_existente');
        exit();
    }

    // Variable que contiene la consulta SQL
    $query = "INSERT INTO Usuario (Nombre_Usuario, correo_Usuario, Contrasena_Usuario)
              VALUES ('$nombre', '$correo', '$contrasena')";

    // Ejecutar la consulta
    $ejecutar = mysqli_query($conn, $query);

    if ($ejecutar) {
        header('Location: ../html/login.html?registro=exitoso');
    } else {
        header('Location: ../html/register.html?error=no_exitoso');
    }

    // Cerrar la conexión
    mysqli_close($conn);
?>
