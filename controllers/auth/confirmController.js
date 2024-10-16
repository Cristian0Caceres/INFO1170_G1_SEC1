const confirmarCodigo = (req, res) => {
    // Extraer los números enviados desde el formulario
    const { numero1, numero2, numero3, numero4, numero5 } = req.body;

    // Concatenar los números
    const numeroConcatenado = `${numero1}${numero2}${numero3}${numero4}${numero5}`;

    // Verificar si el código de recuperación está almacenado en la sesión
    if (req.session.codigo_recuperacion) {
        // Comparar el código ingresado con el código de la sesión
        if (numeroConcatenado === req.session.codigo_recuperacion) {
            // Redirigir a la página para cambiar la contraseña si el código es correcto
            return res.redirect('/html/cambio.html');
        } else {
            // Redirigir de nuevo a la página de recuperación si el código es incorrecto
            return res.redirect('/html/recuperar.html?error=codigo');
        }
    } else {
        // Si no hay código en la sesión, redirigir con error
        return res.redirect('/html/recuperar.html?error=sin_codigo');
    }
};

module.exports = { confirmarCodigo };