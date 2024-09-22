// Función que realiza la búsqueda de el header
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


// Función que realiza la búsqueda de el main
function realizarBusqueda() {
    let query = document.getElementById("searchTiendaInput").value;
    if (query) {
        alert("Buscando: " + query); // Aquí puedes reemplazar el alert por la lógica de búsqueda que prefieras
    }
}

// Detectar cuando se presiona Enter en el campo de búsqueda
document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchTiendaInput");
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") { // Verificar si la tecla presionada es Enter
            realizarBusqueda(); // Llamar a la función de búsqueda
        }
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
