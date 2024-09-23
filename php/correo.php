<?php
    include 'conexion_be.php';

    ini_set('SMTP', 'smtp.gmail.com');
    ini_set('smtp_port', 587);
    ini_set('sendmail_from', 'caciquedelahorro@gmail.com');

    // Capturar los datos del formulario
    if (isset($_POST['correo'])) {
        $correo = htmlspecialchars($_POST['correo']);
    
        // Consulta para verificar si el correo existe
        $validar = mysqli_query($conn, "SELECT * FROM Usuario WHERE correo_Usuario = '$correo'");
        
        // Si el usuario existe
        if (mysqli_num_rows($validar) > 0) {
            // Obtener los datos del usuario
            $usuario = mysqli_fetch_assoc($validar);

            // Redirigir según el correo si es uno de los admins
            if (in_array($usuario['correo_Usuario'], ['Admin1@gmail.com', 'Admin2@gmail.com', 'Admin3@gmail.com'])) {
                header('Location: ../assets/pages/recuperar.html?error=admin');
                exit();
            }

            // Para otros correos generar un código de recuperación
            $codigo = rand(10000, 99999);

            $asunto = "Código de recuperación de cuenta";
            $mensaje = "Tu código de recuperación es: $codigo";
            $cabeceras = "From: caciquedelahorro@gmail.com\r\n";
            $cabeceras .= "Reply-To: caciquedelahorro@gmail.com\r\n";

            // Enviar el correo
            if (mail($correo, $asunto, $mensaje, $cabeceras)) {
                // Si el correo se envía correctamente
                header('Location: ../assets/pages/confirmacion.html');
            } else {
                // Si falla el envío del correo
                header('Location: ../assets/pages/recuperar.html?error=error');
            }
            exit();
        } else {
            // Si no se encuentra el correo en la base de datos
            header('Location: ../assets/pages/recuperar.html?error=credenciales_invalidas');
            exit();
        }
    }

    // Cerrar la conexión
    mysqli_close($conn);
?>
