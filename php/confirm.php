<?php
    session_start(); // Iniciar la sesión para acceder al código guardado

    // Concatenar los números ingresados
    $numeroConcatenado = $_POST['numero1'] . $_POST['numero2'] . $_POST['numero3'] . $_POST['numero4'] . $_POST['numero5'];

    // Verificar si el código ingresado es igual al código almacenado en la sesión
    if (isset($_SESSION['codigo_recuperacion']) && $numeroConcatenado === $_SESSION['codigo_recuperacion']) {
        header('Location: ../html/cambio.html');
    } else {
        header('Location: ../html/recuperar.html?error=codigo');
        exit();
    }
?>