const cart = {};  // Cambiar a un objeto para almacenar la cantidad de cada producto

// Función para cargar los productos desde el backend (PHP)
async function loadProducts() {
    try {
        const response = await fetch('/AdminHomeAll/PHP/getProducts.php');
        const data = await response.json();
        
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar productos anteriores

        const productMap = {}; // Para mapear productos por nombre

        data.forEach(product => {
            if (!productMap[product.name]) {
                productMap[product.name] = [product];
            } else {
                productMap[product.name].push(product);  // Agregar precios adicionales si existen
            }
        });

        // Iterar sobre el mapa de productos
        Object.keys(productMap).forEach(productName => {
            const prices = productMap[productName];
            const mostExpensiveProduct = prices[0];  // El primer producto siempre será el más caro
            const cheapestProduct = prices[prices.length - 1];  // El último producto será el más barato

            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `<span>${productName}: $${mostExpensiveProduct.price}</span>
                <button onclick="addToCart('${productName}', ${mostExpensiveProduct.price})">Agregar al carrito</button>`;

            if (prices.length > 1) {
                productDiv.innerHTML += `<button onclick="alertCheaperProduct('${productName}', ${cheapestProduct.price})">Ver alternativa más barata</button>`;
            }

            productList.appendChild(productDiv);
        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para agregar al carrito
function addToCart(productName, price) {
    if (!cart[productName]) {
        cart[productName] = { price: price, quantity: 1 }; // Agrega el producto con cantidad 1
    } else {
        cart[productName].quantity++; // Incrementa la cantidad si ya existe
    }
    updateCart();
}

// Función para mostrar alerta si hay un producto más barato
function alertCheaperProduct(productName, cheaperPrice) {
    if (confirm(`Hay una versión más barata de ${productName} por $${cheaperPrice}. ¿Deseas cambiarlo?`)) {
        // Solo cambia el precio del producto si está en el carrito
        if (cart[productName]) {
            cart[productName].price = cheaperPrice;
            updateCart();
        }
    }
}

// Función para eliminar un solo producto del carrito
function removeOneFromCart(productName) {
    if (cart[productName]) {
        cart[productName].quantity--;
        if (cart[productName].quantity <= 0) {
            delete cart[productName]; // Eliminar el producto si la cantidad es 0
        }
        updateCart();
    }
}

// Función para eliminar todos los productos de un tipo del carrito
function removeAllFromCart(productName) {
    delete cart[productName]; // Elimina el producto completamente
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;

    Object.keys(cart).forEach(productName => {
        const item = cart[productName];
        total += item.price * item.quantity; // Calcular el total basado en la cantidad
        const li = document.createElement('li');
        li.textContent = `${productName}: $${item.price} (Cantidad: ${item.quantity})`;

        // Botón para eliminar uno
        const removeOneBtn = document.createElement('span');
        removeOneBtn.textContent = 'Eliminar uno';
        removeOneBtn.classList.add('remove');
        removeOneBtn.onclick = () => removeOneFromCart(productName);

        // Botón para eliminar todos
        const removeAllBtn = document.createElement('span');
        removeAllBtn.textContent = 'Eliminar todos';
        removeAllBtn.classList.add('remove');
        removeAllBtn.onclick = () => removeAllFromCart(productName);

        li.appendChild(removeOneBtn);
        li.appendChild(removeAllBtn);
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
}

// Cargar productos al iniciar la página
window.onload = loadProducts;
