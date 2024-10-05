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
            session_start(); // Iniciar la sesión para guardar el código de recuperación y el correo

            // Obtener los datos del usuario
            $usuario = mysqli_fetch_assoc($validar);

            // Redirigir según el correo si es uno de los admins
            if (in_array($usuario['correo_Usuario'], ['Admin1@gmail.com', 'Admin2@gmail.com', 'Admin3@gmail.com'])) {
                header('Location: ../html/recuperar.html?error=admin');
                exit();
            }

            // Generar el código como una cadena de 5 dígitos
            $codigo = strval(rand(10000, 99999));

            // Guardar el código en la sesión como cadena
            $_SESSION['codigo_recuperacion'] = $codigo;
            // Guardar el correo en la sesión
            $_SESSION['correo_usuario'] = $correo;

            $asunto = "Código de recuperación de cuenta";
            $mensaje = "Tu código de recuperación es: $codigo";
            $cabeceras = "From: caciquedelahorro@gmail.com\r\n";
            $cabeceras .= "Reply-To: caciquedelahorro@gmail.com\r\n";

            // Enviar el correo
            if (mail($correo, $asunto, $mensaje, $cabeceras)) {
                // Si el correo se envía correctamente
                header('Location: ../html/confirmacion.html');
            } else {
                // Si falla el envío del correo
                header('Location: ../html/recuperar.html?error=error');
            }
        } else {
            // Si no se encuentra el correo en la base de datos
            header('Location: ../html/recuperar.html?error=credenciales_invalidas');
        }
    }

    // Cerrar la conexión solo si está abierta
    if ($conn) {
        mysqli_close($conn);
    }
?>
