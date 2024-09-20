
function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);
    const registro = urlParams.get('registro');
    if (registro === 'exitoso') {
        alert('Usuario registrado exitosamente');
    }
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;

