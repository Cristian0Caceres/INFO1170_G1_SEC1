console.log("register.js cargado");

function mostrarAlerta() {
    const urlParams = new URLSearchParams(window.location.search);

    // verificar si las contraseñas no coinciden
    const error = urlParams.get('error');

    if (error === 'contrasenas_no_coinciden') {
        alert('Contrasenas no coinciden');
    }
    // verificar si el correo ya existe
    if (error === 'correo_existente') {
        alert('El correo ya esta registrado');
    }
    if (error === 'no_exitoso') {
        alert('Usuario registrado NO exitosamente');
    }
}

// Llama a la función cuando se carga la página
window.onload = mostrarAlerta;