const data = [
    "papa",
    "lechuga",
    "tomate",
    "fideos",
    "tapapecho",
    "wuachalomo",
    "Lasaña pre cocinada",
    "pate",
    "queso",
    "pollo"
];

function displayAllItems() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.classList.add('item');
        resultsContainer.appendChild(div);
    });
}

function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Mostrar todos los elementos al cargar la página
window.onload = displayAllItems;
