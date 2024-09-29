<?php
include "conector.php";

// Consulta para obtener los productos con sus precios, categoría y proveedor
$sql = "SELECT producto.ID_Producto AS id, producto.Nombre_producto AS name, precios.coste AS price, 
        precios.ID_Precios AS id_precio, categoria.Nombre_Categoria AS category, proveedor.Nombre_Proveedor AS provider
        FROM producto
        JOIN precios ON producto.ID_Producto = precios.ID_Productos
        JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria
        JOIN proveedor ON producto.ID_Proveedor = proveedor.ID_Proveedor
        ORDER BY producto.Nombre_producto, precios.coste DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['category'] . "</td>";
        echo "<td>$" . number_format($row['price'], 2) . "</td>";
        echo "<td>" . $row['provider'] . "</td>";
        echo "<td>
                <a href='../php/editar_producto.php?id=" . $row['id'] . "&id_precio=" . $row['id_precio'] . "'>Editar</a> | 
                <a href='../php/eliminar_producto.php?id=" . $row['id'] . "&id_precio=" . $row['id_precio'] . "'>Eliminar</a>
              </td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='6'>No se encontraron productos</td></tr>";
}

$conn->close();
?>
