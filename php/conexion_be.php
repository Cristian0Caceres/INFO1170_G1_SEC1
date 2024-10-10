<?php
    // Conexión a la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "";  
    $dbname = "bd";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);


    if ($conn){
        echo'Conectado exitosamente';
    }else{
        echo 'No se ah podido conectar';
    }
?>