const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/?mensaje=Sesión cerrada con éxito');
    }
  });
};

export { logout };