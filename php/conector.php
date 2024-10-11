<?php
    $servername = "localhost"; 
    $username = "root"; 
    $password = ""; 
    $dbname = "bd"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn){
    }else{
        echo "No se ah podido conectar";
    }
?>