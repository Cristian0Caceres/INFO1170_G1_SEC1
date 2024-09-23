function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'error'
    const error = urlParams.get('error');

    // Verificar si el error es de credenciales inválidas
    if (error === 'admin') {
        alert('el correo que proporcionaste no esta permitido. Por favor, verifica tu correo.');
    }else if (error === 'error') {
        alert('ha ocurrido un error. Por favor, intenta nuevamente.');
    }else if (error === 'credenciales_invalidas') {
        alert('Las credenciales que ingresaste son incorrectas. Por favor, verifica tu correo.');
    }
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;