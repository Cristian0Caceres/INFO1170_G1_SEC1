const confirmarCodigo = (req, res) => {
    try {
        // Extraer los números enviados desde el formulario
        const { numero1, numero2, numero3, numero4, numero5 } = req.body;

        // Validar que los números estén presentes
        if (!numero1 || !numero2 || !numero3 || !numero4 || !numero5) {
            return res.render('recuperar', { mensaje: 'Todos los campos son obligatorios' });
        }

        // Concatenar los números
        const numeroConcatenado = `${numero1}${numero2}${numero3}${numero4}${numero5}`;

        // Verificar si el código de recuperación está almacenado en la sesión
        if (req.session.codigo_recuperacion) {
            // Comparar el código ingresado con el código de la sesión
            if (numeroConcatenado === req.session.codigo_recuperacion) {
                // Redirigir a la página para cambiar la contraseña si el código es correcto
                return res.render('cambio');
            } else {
                // Redirigir de nuevo a la página de recuperación si el código es incorrecto
                return res.render('recuperar', { mensaje: 'Código incorrecto' });
            }
        } else {
            // Si no hay código en la sesión, redirigir con error
            return res.render('recuperar', { mensaje: 'Código de recuperación no encontrado' });
        }
    } catch (error) {
        console.error('Error en confirmarCodigo:', error);
        return res.render('recuperar', { mensaje: 'Ha ocurrido un error, intenta nuevamente' });
    }
};

// Exportación
export { confirmarCodigo };
