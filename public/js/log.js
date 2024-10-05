function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);
    const registro = urlParams.get('registro');
    if (registro === 'exitoso') {
        alert('Usuario registrado exitosamente');
    }

    // Obtener el valor del parámetro 'error'
    const error = urlParams.get('error');

    // Verificar si el error es de credenciales inválidas
    if (error === 'credenciales_invalidas') {
        alert('Las credenciales que ingresaste son incorrectas. Por favor, verifica tu correo y contraseña.');
    }

    const confirmacion = urlParams.get('confirmacion');
    if (confirmacion === 'exito') {
        alert('Contraseña cambiada con exito');
    }
    
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;

