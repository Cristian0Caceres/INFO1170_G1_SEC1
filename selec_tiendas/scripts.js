// Función que realiza la búsqueda en el header
function realizarBusquedaHeader() {
    let query = document.getElementById("searchInput").value;
    if (query) {
        alert("Buscando: " + query); // Aquí puedes reemplazar el alert por la lógica de búsqueda que prefieras
    }
}

// Detectar cuando se presiona Enter en el campo de búsqueda del header
document.addEventListener("DOMContentLoaded", function() {
    let searchInputHeader = document.getElementById("searchInput");
    searchInputHeader.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // Verificar si la tecla presionada es Enter
            realizarBusquedaHeader(); // Llamar a la función de búsqueda
        }
    });
});

// Función para realizar la búsqueda en el main y filtrar tiendas en tiempo real
function realizarBusquedaMain() {
    // Obtener el valor de la barra de búsqueda
    let query = document.getElementById('searchTiendaInput').value.toLowerCase();
    
    // Obtener todas las tiendas (divs con la clase 'tienda')
    let tiendas = document.querySelectorAll('.tienda');

    // Iterar sobre todas las tiendas
    tiendas.forEach(function(tienda) {
        // Obtener el nombre de la tienda dentro del label
        let nombreTienda = tienda.textContent.toLowerCase();

        // Mostrar u ocultar la tienda según si coincide con la búsqueda
        if (nombreTienda.includes(query)) {
            tienda.style.display = ''; // Mostrar la tienda
        } else {
            tienda.style.display = 'none'; // Ocultar la tienda
        }
    });
}

// Detectar cuando el usuario escribe en el campo de búsqueda del main
document.addEventListener("DOMContentLoaded", function() {
    let searchInputMain = document.getElementById("searchTiendaInput");

    // Usar el evento 'input' para filtrar en tiempo real
    searchInputMain.addEventListener("input", function() {
        realizarBusquedaMain(); // Llamar a la función de búsqueda en tiempo real
    });
});

// Función para obtener las tiendas seleccionadas
function obtenerTiendasSeleccionadas() {
    let checkboxes = document.querySelectorAll(".tienda-checkbox");
    let tiendasSeleccionadas = [];

    // Recorre cada checkbox y verifica si está seleccionado
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            tiendasSeleccionadas.push(checkbox.value);
        }
    });

    // Mostrar una alerta con las tiendas seleccionadas
    if (tiendasSeleccionadas.length > 0) {
        alert("Tiendas seleccionadas: " + tiendasSeleccionadas.join(", "));
    } else {
        alert("No se ha seleccionado ninguna tienda.");
    }
}
