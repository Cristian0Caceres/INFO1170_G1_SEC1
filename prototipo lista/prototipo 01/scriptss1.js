document.getElementById('addItemButton').addEventListener('click', function() {
    const itemInput = document.getElementById('itemInput');
    const itemText = itemInput.value.trim();

    if (itemText !== '') {
        const li = document.createElement('li');
        li.textContent = itemText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(deleteButton);
        document.getElementById('shoppingList').appendChild(li);

        itemInput.value = '';
        itemInput.focus();
    }
});
