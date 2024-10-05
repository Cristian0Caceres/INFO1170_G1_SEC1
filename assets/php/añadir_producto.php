<?php
include "conector.php";

// Obtener categorías de la base de datos
$sql_categorias = "SELECT ID_Categoria, Nombre_Categoria FROM categoria";
$result_categorias = $conn->query($sql_categorias);

// Obtener proveedores de la base de datos
$sql_proveedores = "SELECT ID_Proveedor, Nombre_Proveedor FROM proveedor";
$result_proveedores = $conn->query($sql_proveedores);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_producto = $_POST['id_producto'];
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $proveedor = $_POST['proveedor'];
    $id_producto_proveedor = $_POST['id_producto_proveedor']; // Agregando este campo
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
    $imagen = $_POST['imagen'];

    // Validar que la descripción no esté vacía
    if (empty($descripcion)) {
        echo "La descripción no puede estar vacía.";
    }
    // Validar que el precio no sea 0 o negativo
    elseif ($precio <= 0) {
        echo "El precio debe ser mayor que 0.";
    } else {
        // Inserción del nuevo producto
        $sql_producto = "INSERT INTO producto (ID_Producto, ID_Producto_Proveedor, ID_Categoria, ID_Proveedor, Nombre_producto, Descripcion_Producto, imagen_producto) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt_producto = $conn->prepare($sql_producto);
        $stmt_producto->bind_param('iiississ', $id_producto, $id_producto_proveedor, $categoria, $proveedor, $nombre, $descripcion, $imagen);

        if ($stmt_producto->execute()) {
            // Inserción del precio relacionado
            $sql_precio = "INSERT INTO precios (ID_Productos, coste) VALUES (?, ?)";
            $stmt_precio = $conn->prepare($sql_precio);
            $stmt_precio->bind_param('id', $id_producto, $precio);

            if ($stmt_precio->execute()) {
                header('Location: ../html/lista_productos.php');
                exit();
            } else {
                echo "Error al insertar el precio: " . $conn->error;
            }
        } else {
            echo "Error al insertar el producto: " . $conn->error;
        }
    }

    $stmt_producto->close();
    $stmt_precio->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Producto</title>
    <link rel="stylesheet" href="../css/styles4.css">
</head>
<body>
    <h2>Añadir Nuevo Producto</h2>
    <form method="post">
        <label for="id_producto">ID del Producto (numérico):</label>
        <input type="number" id="id_producto" name="id_producto" required>

        <label for="nombre">Nombre del Producto:</label>
        <input type="text" id="nombre" name="nombre" required>

        <label for="id_producto_proveedor">ID del Producto Proveedor (numérico):</label>
        <input type="number" id="id_producto_proveedor" name="id_producto_proveedor" required> <!-- Nuevo campo -->

        <label for="categoria">Selecciona Categoría:</label>
        <select id="categoria" name="categoria" required>
            <option value="">Seleccionar categoría</option>
            <?php
            if ($result_categorias->num_rows > 0) {
                while ($row = $result_categorias->fetch_assoc()) {
                    echo '<option value="' . $row['ID_Categoria'] . '">' . $row['Nombre_Categoria'] . '</option>';
                }
            } else {
                echo '<option value="">No hay categorías disponibles</option>';
            }
            ?>
        </select>

        <label for="proveedor">Selecciona Proveedor:</label>
        <select id="proveedor" name="proveedor" required>
            <option value="">Seleccionar proveedor</option>
            <?php
            if ($result_proveedores->num_rows > 0) {
                while ($row = $result_proveedores->fetch_assoc()) {
                    echo '<option value="' . $row['ID_Proveedor'] . '">' . $row['Nombre_Proveedor'] . '</option>';
                }
            } else {
                echo '<option value="">No hay proveedores disponibles</option>';
            }
            ?>
        </select>

        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" required>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>

        <label for="imagen">Imagen (URL):</label>
        <input type="text" id="imagen" name="imagen" required>

        <button type="submit">Añadir Producto</button>
    </form>
</body>
</html>
