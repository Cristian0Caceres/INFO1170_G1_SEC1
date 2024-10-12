
        // Función que realiza la búsqueda
function realizarBusqueda() {
    let query = document.getElementById("searchInput").value;
         if (query) {
            alert("Buscando: " + query); // Aquí puedes reemplazar el alert por la lógica de búsqueda que prefieras
            }
        }

        // Detectar cuando se presiona Enter en el campo de búsqueda
document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // Verificar si la tecla presionada es Enter
             realizarBusqueda(); // Llamar a la función de búsqueda
                }
            });
        });
   





/// Variable global para el total del carrito
let total = 0;

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

// Función que realiza la búsqueda
function realizarBusqueda() {
    let query = document.getElementById("searchInput").value;
    if (query) {
        alert("Buscando: " + query); // Aquí puedes reemplazar el alert por la lógica de búsqueda que prefieras
    }
}

// Detectar cuando se presiona Enter en el campo de búsqueda
document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // Verificar si la tecla presionada es Enter
            realizarBusqueda(); // Llamar a la función de búsqueda
        }
    });
});

// Función para mostrar el pop-up
function showPopup() {
    const popup = document.getElementById("productSuggestion");
    popup.style.display = "flex"; // Cambia a flex para centrar el contenido
    setTimeout(() => {
        popup.style.opacity = "1"; // Añade transición de opacidad
    }, 10);
}

// Función para cerrar el pop-up
function closePopup() {
    const popup = document.getElementById("productSuggestion");
    popup.style.opacity = "0"; // Cambia la opacidad
    setTimeout(() => {
        popup.style.display = "none"; // Oculta el pop-up después de la transición
    }, 300); // Debe coincidir con la duración de la transición CSS
}

// Ejemplo de función para agregar productos al carrito
function addProductToCart(productName) {
    showPopup(); // Muestra el pop-up al agregar un producto
    // Aquí podrías añadir lógica adicional para el carrito
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
    if (alternativas && alternativas.length > 0) {
        // Si hay alternativas, mostrar el popup
        if (alternativas.length > 1) {
            showPopup(productName); // Mostrar opciones si hay más de una
        } else {
            // Si solo hay una alternativa, agregar el producto directamente
            const precio = alternativas[0].precio; // Tomar el precio del único producto disponible
            addToCart(productName, precio);
        }
    } else {
        alert("Producto no disponible."); // Mensaje si no hay alternativas
    }
}

// Función para mostrar la alternativa más barata y agregarla al carrito
function showAlternative() {
    const alternativas = productos[productoActual];
    if (alternativas && alternativas.length > 1) {
        // Encuentra la alternativa más barata
        const alternativaBarata = alternativas.reduce((prev, curr) => (prev.precio < curr.precio) ? prev : curr);
        // Agregar el producto alternativo al carrito
        addToCart(productoActual, alternativaBarata.precio);
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

