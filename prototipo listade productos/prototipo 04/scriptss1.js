function agregarArticulo() {
    const categoria = document.getElementById('categoria').value;
    const articulo = document.getElementById('articulo').value;
    const cantidad = document.getElementById('cantidad').value;

    const lista = document.getElementById('lista');
    const nuevoArticulo = document.createElement('li');
    nuevoArticulo.textContent = `${cantidad} x ${articulo} (${categoria})`;
    lista.appendChild(nuevoArticulo);
}
