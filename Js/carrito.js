let total = 0; // Variable global para el total

// Base de datos de productos con precios y tiendas
const productos = {
    'Asiento Al Vacío': [
        { tienda: 'Jumbo', precio: 12000 },
        { tienda: 'Unimarc', precio: 11000 } // Alternativa más barata
    ],
    'Kilo ( Palta )': [
        { tienda: 'Jumbo', precio: 6000 },
        { tienda: 'Unimarc', precio: 5500 } // Alternativa más barata
    ],
    // Agrega más productos según sea necesario
};

let productoActual;

// Función para mostrar el popup de sugerencia de producto
function showPopup(productName) {
    productoActual = productName; // Almacenar el producto actual
    document.getElementById("productSuggestion").style.display = "block";
}

// Función para cerrar el popup
function closePopup() {
    document.getElementById("productSuggestion").style.display = "none";
}

// Función para agregar al carrito
function addToCart(productName, productPrice) {
    let cartItems = document.getElementById("cart-items");

    // Crear el contenedor del producto
    let newItem = document.createElement("li");
    newItem.classList.add("cart-item"); // Añadir clase CSS para estilo
    newItem.innerHTML = `
        <span class="product-info">${productName} - $${productPrice.toFixed(2)}</span>
    `;

    // Crear el botón de eliminar
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.classList.add("eliminar-btn", "morado-btn");

    // Añadir el botón al contenedor del producto
    newItem.appendChild(removeBtn);

    // Añadir el nuevo producto al carrito
    cartItems.appendChild(newItem);

    // Actualizar el total
    total += productPrice;
    document.getElementById("total").textContent = total.toFixed(2);

    // Función para eliminar productos
    removeBtn.onclick = function() {
        removeFromCart(newItem, productPrice);
    };
}

// Función para eliminar productos
function removeFromCart(itemElement, productPrice) {
    itemElement.remove(); // Eliminar el elemento del carrito
    total -= productPrice; // Restar el precio al total
    document.getElementById("total").textContent = total.toFixed(2); // Actualizar el total
}

// Función para agregar un producto al carrito, mostrando alternativas si es necesario
function addProductToCart(productName) {
    const alternativas = productos[productName];
    if (alternativas && alternativas.length > 1) {
        // Mostrar el popup para elegir la alternativa más barata
        showPopup(productName);
    } else {
        // Si no hay alternativas, agregar el producto directamente
        const precio = alternativas[0].precio; // Tomar el precio del único producto disponible
        addToCart(productName, precio);
    }
}

// Función para mostrar la alternativa más barata y agregarla al carrito
function showAlternative() {
    const alternativas = productos[productoActual];
    if (alternativas && alternativas.length > 1) {
        // Encuentra la alternativa más barata
        const alternativaBarata = alternativas.sort((a, b) => a.precio - b.precio)[1];
        if (alternativaBarata) {
            // Agregar el producto alternativo al carrito
            addToCart(productoActual, alternativaBarata.precio);
        }
    } else {
        alert('No hay alternativas más baratas disponibles.');
    }
    closePopup();
}

// Manejar botones dentro del popup
document.getElementById("yesBtn").onclick = function() {
    showAlternative(); // Llama a la función que agrega la alternativa más barata
};

document.getElementById("noBtn").onclick = function() {
    closePopup(); // Cierra el popup sin hacer nada
};
