<?php
    include 'conexion_be.php';

    // Capturar los datos del formulario
    $correo = htmlspecialchars($_POST['correo']);
    $contrasena = htmlspecialchars($_POST['password']);

    // Consulta para verificar si el correo y la contraseña son correctos
    $validar = mysqli_query($conn, "SELECT * FROM Usuario WHERE correo_Usuario = '$correo' AND Contrasena_Usuario = '$contrasena'");

    // Si hay un resultado, el usuario existe y las credenciales son correctas
    if (mysqli_num_rows($validar) > 0) {
        // Obtener los datos del usuario para verificar su correo específico
        $usuario = mysqli_fetch_assoc($validar);

        // Redirigir según el correo
        // Si el correo es alguno de los 3 admis, redirigir a la página de administrador
        if ($usuario['correo_Usuario'] == 'Admin1@gmail.com') {
            header('Location: ../html/admin_home.html');
        } elseif ($usuario['correo_Usuario'] == 'Admin2@gmail.com') {        
            header('Location: ../html/admin_home.html'); //reemplazar la direccion por la de inicio de admin
        } elseif ($usuario['correo_Usuario'] == 'Admin3@gmail.com') {
            header('Location: ../html/admin_home.html');
        }
        // Para otros correos, redirigir a la pagina general
        else {
            header('Location: ../../index.html'); //reemplazar la direccion por la de incio de usuario
        }
        exit();
    } else {
        // Si las credenciales no son correctas, redirigir al login con un error
        header('Location: ../html/login.html?error=credenciales_invalidas');
        exit();
    }

    // Cerrar la conexión
    mysqli_close($conn);
?>
