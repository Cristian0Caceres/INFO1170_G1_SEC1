<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "BD";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener los productos con sus precios
$sql = "SELECT producto.ID_Producto AS id, producto.Nombre_producto AS name, precios.coste AS price, categoria.Nombre_Categoria AS category
        FROM producto
        JOIN precios ON producto.ID_Producto = precios.ID_Productos
        JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
        ORDER BY producto.Nombre_producto, precios.coste DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['category'] . "</td>";
        echo "<td>$" . number_format($row['price'], 2) . "</td>";
        echo "<td>
                <a href='editar_producto.php?id=" . $row['id'] . "'>Editar</a> | 
                <a href='eliminar_producto.php?id=" . $row['id'] . "'>Eliminar</a>
              </td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='5'>No se encontraron productos</td></tr>";
}

$conn->close();
?>
