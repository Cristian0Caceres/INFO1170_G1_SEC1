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
    $proveedor = $_POST['proveedor']; // Nuevo campo de proveedor
    $precio = $_POST['precio'];

    // Comprobar si el producto ya existe
    $sql_check_producto = "SELECT * FROM producto WHERE ID_Producto = ? AND Nombre_producto = ? AND ID_Categoria = ?";
    $stmt_check = $conn->prepare($sql_check_producto);
    $stmt_check->bind_param('isi', $id_producto, $nombre, $categoria);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        // Actualizar el precio si el producto ya existe
        $sql_update_precio = "UPDATE precios SET coste = ? WHERE ID_Productos = ?";
        $stmt_update_precio = $conn->prepare($sql_update_precio);
        $stmt_update_precio->bind_param('di', $precio, $id_producto);

        if ($stmt_update_precio->execute()) {
            echo "Precio actualizado exitosamente.";
            header('Location: lista_productos.php');
            exit();
        } else {
            echo "Error al actualizar el precio: " . $conn->error;
        }
    } else {
        // Inserción del nuevo producto
        $sql_producto = "INSERT INTO producto (ID_Producto, Nombre_producto, ID_Categoria, ID_Proveedor) VALUES (?, ?, ?, ?)";
        $stmt_producto = $conn->prepare($sql_producto);
        $stmt_producto->bind_param('isii', $id_producto, $nombre, $categoria, $proveedor);

        if ($stmt_producto->execute()) {
            // Inserción del precio relacionado
            $sql_precio = "INSERT INTO precios (ID_Productos, coste) VALUES (?, ?)";
            $stmt_precio = $conn->prepare($sql_precio);
            $stmt_precio->bind_param('id', $id_producto, $precio);

            if ($stmt_precio->execute()) {
                header('Location: lista_productos.php');
                exit();
            } else {
                echo "Error al insertar el precio: " . $conn->error;
            }
        } else {
            echo "Error al insertar el producto: " . $conn->error;
        }
    }

    $stmt_check->close();
    $stmt_update_precio->close();
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
    <link rel="stylesheet" href="/AdminHomeAll/CSS/styles4.css">
</head>
<body>
    <h2>Añadir Nuevo Producto</h2>
    <form method="post">
        <label for="id_producto">ID del Producto (numérico):</label>
        <input type="number" id="id_producto" name="id_producto" required>

        <label for="nombre">Nombre del Producto:</label>
        <input type="text" id="nombre" name="nombre" required>

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

        <button type="submit">Añadir Producto</button>
    </form>
</body>
</html>
