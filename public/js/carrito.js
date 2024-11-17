
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