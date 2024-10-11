<?php
include "conector.php";

// Verifica si se ha enviado una búsqueda
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Modifica la consulta SQL para incluir la descripción y la imagen
$sql = "SELECT producto.ID_Producto AS id, producto.Nombre_producto AS name, producto.Descripcion_Producto AS description, 
        producto.imagen_producto AS image, producto.Costo AS price, producto.ID_Producto AS id_precio, 
        categoria.Nombre_Categoria AS category, proveedor.Nombre_Proveedor AS provider
        FROM producto
        JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
        JOIN proveedor ON producto.ID_Proveedor = proveedor.ID_Proveedor";

// Si el usuario ingresó algo en el buscador, agregar la condición de búsqueda
if ($search) {
    $sql .= " WHERE producto.Nombre_producto LIKE '%" . $conn->real_escape_string($search) . "%'";
}

$sql .= " ORDER BY producto.Nombre_producto, producto.Costo DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['category'] . "</td>";
        echo "<td>$" . number_format($row['price'], 2) . "</td>";
        echo "<td>" . $row['provider'] . "</td>";
        echo "<td>" . $row['description'] . "</td>";  // Mostrar la descripción
        echo "<td><img src='" . $row['image'] . "' alt='" . $row['name'] . "' style='width:100px;'></td>"; // Mostrar la imagen
        echo "<td>
                <a href='../php/editar_producto.php?id=" . $row['id'] . "'>Editar</a> | 
                <a href='../php/eliminar_producto.php?id=" . $row['id'] . "'>Eliminar</a>
              </td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='8'>No se encontraron productos</td></tr>";
}

$conn->close();
?>
