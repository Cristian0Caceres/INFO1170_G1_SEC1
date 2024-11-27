// Controlador para el panel de administración
const getAdminHome = (req, res) => {
    // Renderiza la vista del panel de administración
    res.render('admin_home', {
        title: 'Panel de Administración',
    });
};

module.exports = {
    getAdminHome,
};
