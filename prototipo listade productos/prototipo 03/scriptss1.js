function addItem() {
    const itemInput = document.getElementById('itemInput');
    const categorySelect = document.getElementById('categorySelect');
    const itemText = itemInput.value.trim();
    const category = categorySelect.value;

    if (itemText !== '') {
        const li = document.createElement('li');
        li.textContent = `${itemText} (${category})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            li.remove();
        };

        li.appendChild(deleteButton);
        document.getElementById('shoppingList').appendChild(li);

        itemInput.value = '';
    }
}

function clearList() {
    document.getElementById('shoppingList').innerHTML = '';
}
