
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
           
        
        
        
        
        
                let total = 0;
        
        const productos = {
            'Asiento Al Vacío': [
                { tienda: 'Jumbo', precio: 13690 },
                { tienda: 'Unimarc', precio: 11000 }
            ],
            'Kilo (Palta)': [
                { tienda: 'Jumbo', precio: 6000 },
                { tienda: 'Unimarc', precio: 5500 }
            ],
            'Mantequilla 250g': [ // Agregamos la mantequilla aquí
                { tienda: 'Jumbo', precio: 1950},
                { tienda: 'Unimarc', precio: 500 }
            ],
            // Otros productos...
        };
        
        let productoActual;
        
        function realizarBusqueda() {
            let query = document.getElementById("searchInput").value;
            if (query) {
                alert("Buscando: " + query);
            }
        }
        
        document.addEventListener("DOMContentLoaded", function() {
            let searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    realizarBusqueda();
                }
            });
        });
        
        function showPopup() {
            const popup = document.getElementById("productSuggestion");
            popup.style.display = "flex"; 
            setTimeout(() => {
                popup.style.opacity = "1";
            }, 10);
        }
        
        function closePopup() {
            const popup = document.getElementById("productSuggestion");
            popup.style.opacity = "0";
            setTimeout(() => {
                popup.style.display = "none";
            }, 300);
        }
        
        function addProductToCart(productName) {
            const alternativas = productos[productName];
            productoActual = productName; 
        
            if (alternativas && alternativas.length > 0) {
                if (alternativas.length > 1) {
                    showPopup(); 
                } else {
                    const precio = alternativas[0].precio; 
                    addToCart(productName, precio);
                }
            } else {
                alert("Producto no disponible.");
            }
        }
        
        function addToCart(productName, productPrice) {
            let cartItems = document.getElementById("cart-items");
        
            let newItem = document.createElement("li");
            newItem.classList.add("cart-item"); 
            newItem.innerHTML = `
                <span class="product-info">${productName} - $${productPrice.toFixed(2)}</span>
            `;
        
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Eliminar";
            removeBtn.classList.add("eliminar-btn", "morado-btn");
        
            newItem.appendChild(removeBtn);
            cartItems.appendChild(newItem);
        
            total += productPrice;
            document.getElementById("total").textContent = total.toFixed(2);
        
            removeBtn.onclick = function() {
                removeFromCart(newItem, productPrice);
            };
        }
        
        function removeFromCart(itemElement, productPrice) {
            itemElement.remove(); 
            total -= productPrice; 
            document.getElementById("total").textContent = total.toFixed(2);
        }
        
        function showAlternative() {
            const alternativas = productos[productoActual];
        
            if (alternativas && alternativas.length > 0) {
                const alternativaBarata = alternativas.reduce((prev, curr) => (prev.precio < curr.precio) ? prev : curr);
                addToCart(productoActual, alternativaBarata.precio);
            } else {
                alert('No hay alternativas más baratas disponibles.');
            }
            closePopup();
        }
        
        document.getElementById("yesBtn").onclick = function() {
            showAlternative();
        };
        
        document.getElementById("noBtn").onclick = function() {
            closePopup(); 
            const precioOriginal = productos[productoActual][0].precio; 
            addToCart(productoActual, precioOriginal); 
        };
        
        import { cargarProductos, addProductToCart, getCartProducts } from '../js/productos.js';
        
        // Función para cargar productos en la página
        function cargarProductosEnPagina() {
            cargarProductos().then(data => {
                console.log(data); // Agrega este log para ver los datos
                const jumboContainer = document.getElementById('productos-container-jumbo');
                const unimarcContainer = document.getElementById('productos-container-unimarc');
        
                jumboContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
                unimarcContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
        
                data.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto');
                    productoDiv.innerHTML = `
                        <div class="image-container">
                            <img src="${producto.imagen_producto}" alt="${producto.Nombre_producto}">
                            <span class="tooltip">${producto.Descripcion_Producto}</span>
                        </div>
                        <p>${producto.Nombre_producto}</p>
                        <p class="precio normal">$${producto.coste}</p>
                        <button class="agregar-btn" onclick="agregarAlCarrito('${producto.Nombre_producto}', '${producto.coste}')">Agregar al carrito</button>
                    `;
                    
                    // Asegúrate de que el campo 'tienda' esté presente en tus datos
                    if (producto.tienda === 'Jumbo') {
                        jumboContainer.appendChild(productoDiv);
                    } else if (producto.tienda === 'Unimarc') {
                        unimarcContainer.appendChild(productoDiv);
                    }
                });
            }).catch(error => {
                console.error('Error cargando productos:', error); // Captura errores
            });
        }
        // Función para agregar un producto al carrito
        window.agregarAlCarrito = function(nombre, costo) {
            const producto = { Nombre_producto: nombre, Costo: costo };
            addProductToCart(producto);
            actualizarCarrito();
        }
        
        // Función para actualizar el carrito en la interfaz
        function actualizarCarrito() {
            const cartItems = getCartProducts();
            const cartList = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');
        
            cartList.innerHTML = ''; // Limpiar la lista de productos en el carrito
            let total = 0;
        
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.Nombre_producto} - $${item.Costo}`;
                cartList.appendChild(li);
                total += parseFloat(item.Costo); // Sumar al total
            });
        
            totalElement.textContent = total.toFixed(2); // Actualizar el total en la interfaz
        }
        
        // Llama a la función para cargar productos al cargar la página
        window.onload = cargarProductosEnPagina;
        
        // 17