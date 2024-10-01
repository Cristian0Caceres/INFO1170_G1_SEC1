<?php
include "conector.php";

// Obtener categorías de la base de datos
$sql_categorias = "SELECT ID_Categoria, Nombre_Categoria FROM categoria";
$result_categorias = $conn->query($sql_categorias);

// Obtener proveedores de la base de datos
$sql_proveedores = "SELECT ID_Proveedor, Nombre_Proveedor FROM proveedor";
$result_proveedores = $conn->query($sql_proveedores);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Actualizar producto
    $id = $_POST['id']; // ID del producto
    $id_precio = $_POST['id_precio']; // ID del precio
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $proveedor = $_POST['proveedor'];
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
    $imagen = $_POST['imagen'];

    // Validar que la descripción no esté vacía
    if (empty($descripcion)) {
        echo "La descripción no puede estar vacía.";
    } else {
        // Actualización de la tabla producto y precios
        $sql = "UPDATE producto 
                JOIN precios ON producto.ID_Producto = precios.ID_Productos
                SET producto.Nombre_producto = ?, 
                    producto.ID_Categoria = ?, 
                    producto.ID_Proveedor = ?, 
                    producto.Descripcion_Producto = ?, 
                    producto.imagen_producto = ?, 
                    precios.coste = ?
                WHERE producto.ID_Producto = ? 
                AND precios.ID_Precios = ?";

        $stmt = $conn->prepare($sql);
        // Asegúrate de que las columnas están correctamente vinculadas
        $stmt->bind_param('siiissii', $nombre, $categoria, $proveedor, $descripcion, $imagen, $precio, $id, $id_precio);
        
        if ($stmt->execute()) {
            header('Location: ../html/lista_productos.php');
            exit();
        } else {
            echo "Error al actualizar: " . $stmt->error; // Cambiar para mostrar el error del statement
        }
    }
} else {
    // Obtener datos del producto para mostrar en el formulario
    $id = $_GET['id'];
    $id_precio = $_GET['id_precio'];

    $sql = "SELECT producto.Nombre_producto, 
                   producto.ID_Categoria, 
                   producto.ID_Proveedor, 
                   producto.Descripcion_Producto, 
                   producto.imagen_producto, 
                   precios.coste, 
                   precios.ID_Precios
            FROM producto
            JOIN precios ON producto.ID_Producto = precios.ID_Productos
            WHERE producto.ID_Producto = ? 
            AND precios.ID_Precios = ? 
            LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $id, $id_precio);
    $stmt->execute();
    $result = $stmt->get_result();
    $producto = $result->fetch_assoc();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Producto</title>
    <link rel="stylesheet" href="../css/styles4.css">
</head>
<body>
    <h2>Editar Producto</h2>
    <form method="post">
        <input type="hidden" name="id" value="<?php echo htmlspecialchars($id); ?>">
        <input type="hidden" name="id_precio" value="<?php echo htmlspecialchars($producto['ID_Precios']); ?>">

        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" value="<?php echo htmlspecialchars($producto['Nombre_producto'], ENT_QUOTES); ?>" required>

        <!-- Selección de Categoría -->
        <label for="categoria">Categoría:</label>
        <select name="categoria" required>
            <option value="">Seleccionar categoría</option>
            <?php
            if ($result_categorias->num_rows > 0) {
                while ($row = $result_categorias->fetch_assoc()) {
                    $selected = ($row['ID_Categoria'] == $producto['ID_Categoria']) ? 'selected' : '';
                    echo '<option value="' . htmlspecialchars($row['ID_Categoria']) . '" ' . $selected . '>' . htmlspecialchars($row['Nombre_Categoria'], ENT_QUOTES) . '</option>';
                }
            } else {
                echo '<option value="">No hay categorías disponibles</option>';
            }
            ?>
        </select>

        <!-- Selección de Proveedor -->
        <label for="proveedor">Proveedor:</label>
        <select name="proveedor" required>
            <option value="">Seleccionar proveedor</option>
            <?php
            if ($result_proveedores->num_rows > 0) {
                while ($row = $result_proveedores->fetch_assoc()) {
                    $selected = ($row['ID_Proveedor'] == $producto['ID_Proveedor']) ? 'selected' : '';
                    echo '<option value="' . htmlspecialchars($row['ID_Proveedor']) . '" ' . $selected . '>' . htmlspecialchars($row['Nombre_Proveedor'], ENT_QUOTES) . '</option>';
                }
            } else {
                echo '<option value="">No hay proveedores disponibles</option>';
            }
            ?>
        </select>

        <label for="precio">Precio:</label>
        <input type="number" name="precio" value="<?php echo htmlspecialchars($producto['coste'], ENT_QUOTES); ?>" required>

        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" required><?php echo htmlspecialchars($producto['Descripcion_Producto'], ENT_QUOTES); ?></textarea>

        <label for="imagen">Imagen (URL):</label>
        <input type="text" name="imagen" value="<?php echo htmlspecialchars($producto['imagen_producto'], ENT_QUOTES); ?>" required>
        
        <button type="submit">Actualizar</button>
    </form>
</body>
</html>
