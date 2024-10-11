<?php
// productos.php

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bd";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL que selecciona los productos, el proveedor, el precio más bajo y la imagen
$sql = "
    SELECT Producto.Nombre_Producto, MIN(Precios.coste) as Precio_Minimo, Producto.imagen_producto
    FROM Producto
    JOIN Precios ON Producto.ID_Producto = Precios.ID_Productos
    WHERE Producto.ID_Categoria = 2
    GROUP BY Producto.Nombre_Producto, Producto.imagen_producto
";

// Ejecutar la consulta
$result = $conn->query($sql);

// Comprobar si hay resultados
if ($result->num_rows > 0) {
    // Recorrer los resultados y mostrarlos
    while ($row = $result->fetch_assoc()) {
        echo "<div>";
        echo "<img src='" . $row["imagen_producto"] . "' alt='" . $row["Nombre_Producto"] . "'>"; // Mostrar la imagen del producto
        echo "<p>" . $row["Nombre_Producto"] . "</p>"; // Mostrar el nombre del producto
        echo "<p>Desde: $" . $row["Precio_Minimo"] . "</p>"; // Mostrar el precio más bajo
        echo "</div>";
    }
} else {
    echo "No se encontraron productos.";
}

// Cerrar la conexión
$conn->close();
?>
