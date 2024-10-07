function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro
    const error = urlParams.get('confirmacion');

    // Verificar si el error es de credenciales inválidas
    if (error === 'contrasenas_no_coinciden') {
        alert('Las contraseñas no coinciden. Por favor, intenta nuevamente.');
    }else if (error === 'error') {
        alert('ha ocurrido un error. Por favor, intenta nuevamente.');
    }else if (error === 'sesion_expirada') {
        alert('ha ocurrido un error. Por favor, intenta nuevamente.');
    }
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;