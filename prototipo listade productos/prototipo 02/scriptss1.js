document.getElementById('add-item').addEventListener('click', function() {
    const itemText = document.getElementById('new-item').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    if (itemText === '' || itemQuantity <= 0) return;

    const li = document.createElement('li');
    li.textContent = `${itemText} - Cantidad: ${itemQuantity}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(deleteBtn);
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    document.getElementById('shopping-list').appendChild(li);
    document.getElementById('new-item').value = '';
    document.getElementById('item-quantity').value = 1;
});
