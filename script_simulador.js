const cart = [];
const products = {};  // Almacenará los productos

// Función para cargar los productos desde el backend (PHP)
async function loadProducts() {
    try {
        const response = await fetch('getProducts.php');
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
            const cheapestProduct = prices[0];  // El primer producto siempre será el más barato (debido al ORDER BY en la consulta SQL)
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `<span>${productName}: $${cheapestProduct.price}</span>
                <button onclick="addToCart('${productName}', ${cheapestProduct.price})">Agregar al carrito</button>`;

            if (prices.length > 1) {
                productDiv.innerHTML += `<button onclick="offerCheaperAlternative('${productName}', ${prices[1].price}, '${prices[1].id}')">Ver alternativa más barata</button>`;
            }

            productList.appendChild(productDiv);
        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para agregar al carrito
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // Si ya existe, reemplazar el producto con el nuevo precio
        existingProduct.price = price;
    } else {
        // Si no existe, agregar el producto al carrito
        cart.push({ name: productName, price: price });
    }
    updateCart();
}

// Función para ofrecer alternativa más barata
function offerCheaperAlternative(productName, cheaperPrice, cheaperProductId) {
    const replace = confirm(`Hay una versión más barata de ${productName} por $${cheaperPrice}. ¿Deseas reemplazar el producto en el carrito?`);

    if (replace) {
        // Reemplazar el producto en el carrito
        const index = cart.findIndex(item => item.name === productName);
        if (index !== -1) {
            cart[index].price = cheaperPrice;
        } else {
            cart.push({ name: productName, price: cheaperPrice });
        }
        updateCart();
    }
}

// Función para eliminar del carrito
function removeFromCart(productName) {
    // Filtrar los productos que no coinciden con el nombre del producto a eliminar
    const newCart = cart.filter(item => item.name !== productName);
    // Solo se debe eliminar una instancia del producto si hay más de uno
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
