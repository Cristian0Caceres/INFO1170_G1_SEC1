const cart = [];
const products = {};  // Almacenará los productos de la base de datos

// Función para cargar los productos desde el backend (PHP)
async function loadProducts() {
    try {
        const response = await fetch('getProducts.php');  // Llama al PHP que obtiene los productos
        const data = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar cualquier producto anterior

        data.forEach(product => {
            // Añadir cada producto al objeto 'products'
            products[product.name] = { price: product.price, category: product.category };

            // Crear el elemento HTML para cada producto
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `<span>${product.name}: $${product.price}</span> 
                <button onclick="addToCart('${product.name}', ${product.price})">Agregar al carrito</button>`;
            productList.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index > -1) {
        cart.splice(index, 1);  // Eliminar el producto del carrito
        updateCart();  // Actualizar el carrito
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name}: $${item.price}`;
        
        // Botón para eliminar producto
        const removeBtn = document.createElement('span');
        removeBtn.textContent = 'Eliminar';
        removeBtn.classList.add('remove');
        removeBtn.onclick = () => removeFromCart(item.name);

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
}

// Llamar a la función para cargar productos cuando la página cargue
window.onload = loadProducts;
