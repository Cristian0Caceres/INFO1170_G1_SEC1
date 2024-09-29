function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'error'
    const error = urlParams.get('error');

    // Verificar si el error es de credenciales inválidas
    if (error === 'codigo') {
        alert('Codigo incorrecto');
    }
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;