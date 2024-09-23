<?php
    include 'conexion_be.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    // Capturar los datos del formulario
    $correo = htmlspecialchars($_POST['correo']);
    
    // Consulta para verificar si el correo y la contraseña son correctos
    $validar = mysqli_query($conn, "SELECT * FROM Usuario WHERE correo_Usuario = '$correo'");
    
    // Si hay un resultado, el usuario existe y las credenciales son correctas
    if (mysqli_num_rows($validar) > 0) {
        // Obtener los datos del usuario para verificar su correo específico
        $usuario = mysqli_fetch_assoc($validar);

        // Redirigir según el correo
        // Si el correo es alguno de los 3 admis, dar aviso y dejar en la misma pagina
        if ($usuario['correo_Usuario'] == 'Admin1@gmail.com') {
            header('Location: ../assets/pages/recuperar.html?error=admin');
        } elseif ($usuario['correo_Usuario'] == 'Admin2@gmail.com') {        
            header('Location: ../assets/pages/recuperar.html?error=admin'); 
        } elseif ($usuario['correo_Usuario'] == 'Admin3@gmail.com') {
            header('Location: ../assets/pages/recuperar.html?error=admin');
        }
        // Para otros correos enviar el correo con los numeros generados y seguir a la sig pag
        else {
            // Generar un código de 5 dígitos aleatorios
            $codigo = rand(10000, 99999);

            // Guardar el código en la sesión (puedes también guardarlo en la base de datos si lo prefieres)
            session_start();
            $_SESSION['codigo_recuperacion'] = $codigo;
            $_SESSION['correo'] = $correo;

            // Crear una nueva instancia de PHPMailer
            $mail = new PHPMailer(true);

            try {
                // Configuración del servidor SMTP
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';  // Servidor SMTP de Gmail
                $mail->SMTPAuth   = true;
                $mail->Username   = 'caciquedelahorro@gmail.com';  // Dirección de correo de Gmail
                $mail->Password   = 'Cacique_Del_Ahorro';        // Contraseña del correo
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;

                // Configurar el correo
                $mail->setFrom('caciquedelahorro@gmail.com', 'Cacique del ahorro');
                $mail->addAddress($correo);     // Enviar el correo al gmail del usuario

                // Contenido del correo
                $mail->isHTML(true);
                $mail->Subject = 'Código de recuperación de cuenta';
                $mail->Body    = 'Tu código de recuperación es: <b>' . $codigo . '</b>. Úsalo para restablecer tu cuenta.';

                // Enviar el correo
                $mail->send();
                
                // Redirigir a la página de confirmación
                header('Location: ../assets/pages/confirmacion.html'); 
                exit();

            } catch (Exception $e) {
                header('Location: ../assets/pages/recuperar.html?error=error');
            }
        }
        exit();
    } else {
        // Si las credenciales no son correctas, redirigir a recuperar contraseña con un error
        header('Location: ../assets/pages/recuperar.html?error=credenciales_invalidas');
        exit();
    }

    // Cerrar la conexión
    mysqli_close($conn);
?>