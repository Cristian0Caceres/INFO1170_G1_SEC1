function realizarBusqueda() {
    let query = document.getElementById("searchInput").value;
    if (query) {
        // Redirige a la ruta de búsqueda con el término ingresado
        window.location.href = `/productos/buscar?q=${encodeURIComponent(query)}`;
     }
}
    
 // Detectar cuando se presiona Enter en el campo de búsqueda
 document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            realizarBusqueda();
        }
    });
});