<?php
    session_start(); // Iniciar la sesión para acceder al correo
    include 'conexion_be.php';

    // Obtener el correo almacenado en la sesión
    if (isset($_SESSION['correo_usuario'])) {
        $correo = $_SESSION['correo_usuario'];

        // Capturar y limpiar los datos de las contraseñas
        $contrasena = htmlspecialchars($_POST['password']);
        $confirmarContrasena = htmlspecialchars($_POST['confirm_password']);

        // Verificar que las contraseñas coincidan
        if ($contrasena !== $confirmarContrasena) {
            // Redirigir con el mensaje de que no coinciden
            header('Location: ../assets/pages/cambio.html?confirmacion=contrasenas_no_coinciden');
            exit();
        }

        // Actualizar la contraseña en la base de datos
        $actualizar = mysqli_query($conn, "UPDATE Usuario SET contrasena_Usuario = '$contrasena' WHERE correo_Usuario = '$correo'");

        if ($actualizar) {
            header('Location: ../login.html?confirmacion=exito');
        } else {
            // Si ocurre un error durante la actualización
            header('Location: ../assets/pages/cambio.html?confirmacion=error');
        }
    } else {
        // Si no hay correo en la sesión, redirigir a la página de recuperación
        header('Location: ../assets/pages/recuperar.html?confirmacion=sesion_expirada');
        exit();
    }

    if ($conn) {
        mysqli_close($conn);
    }
?>
