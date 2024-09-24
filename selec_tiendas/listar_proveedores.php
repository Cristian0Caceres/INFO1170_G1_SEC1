<?php
    // Conexión a la base de datos
    $conn = new mysqli('localhost', 'root', '', 'bd');

    // Verificar conexión
    if ($conn->connect_error) {
        die("Error en la conexión: " . $conn->connect_error);
    }

    // Consulta para obtener los proveedores
    $sql = "SELECT ID_Proveedor, Nombre_Proveedor FROM proveedor";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Listar los proveedores como checkboxes
        while($row = $result->fetch_assoc()) {
            echo '<div class="tienda">';
            echo '<label>';
            echo '<input type="checkbox" class="tienda-checkbox" value="'.$row['Nombre_Proveedor'].'">';
            echo $row['Nombre_Proveedor'];
            echo '</label>';
            echo '</div>';
        }
    } else {
        echo "No hay proveedores disponibles.";
    }

    // Cerrar la conexión
    $conn->close();
?>
