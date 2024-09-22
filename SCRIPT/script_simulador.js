const cart = [];
const products = {};  // Almacenará los productos

// Función para cargar los productos desde el backend (PHP)
async function loadProducts() {
    try {
        const response = await fetch('/INFO1170_G1_SEC1/PHP/getProducts.php');
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
            const mostExpensiveProduct = prices[0];  // El primer producto siempre será el más caro (debido al ORDER BY en la consulta SQL)
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
    cart.push({ name: productName, price: price });
    updateCart();
}

// Función para mostrar alerta si hay un producto más barato
function alertCheaperProduct(productName, cheaperPrice) {
    if (confirm(`Hay una versión más barata de ${productName} por $${cheaperPrice}. ¿Deseas cambiarlo?`)) {
        const productIndex = cart.findIndex(item => item.name === productName);
        if (productIndex !== -1) {
            cart[productIndex].price = cheaperPrice;
            updateCart();
        }
    }
}

// Función para eliminar del carrito
function removeFromCart(productName) {
    const newCart = cart.filter(item => item.name !== productName);
    if (cart.length > newCart.length) {
        cart.length = 0; // Limpiar el carrito actual
        cart.push(...newCart); // Reemplazarlo con el nuevo carrito
        updateCart(); // Actualizar la vista del carrito
    }
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name}: $${item.price}`;

        // Botón para eliminar
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'Eliminar';
        removeBtn.classList.add('remove');
        removeBtn.onclick = () => removeFromCart(item.name);

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
}

// Cargar productos al iniciar la página
window.onload = loadProducts;
