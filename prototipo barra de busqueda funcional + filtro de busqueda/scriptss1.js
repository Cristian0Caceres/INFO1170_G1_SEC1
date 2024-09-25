const data = [
    { name: "papa", category: "vegetales", prices: [500, 450] },
    { name: "lechuga", category: "vegetales", prices: [300, 280] },
    { name: "tomate", category: "vegetales", prices: [400, 350] },
    { name: "fideos", category: "otros", prices: [700, 650] },
    { name: "tapapecho", category: "carnes", prices: [1500, 1400] },
    { name: "wuachalomo", category: "carnes", prices: [2000, 1900] },
    { name: "Lasaña pre cocinada", category: "otros", prices: [1200, 1100] },
    { name: "tabla de madera 2 x 4", category: "otros", prices: [80000, 7500] },
    { name: "queso", category: "lácteos", prices: [1000, 950] },
    { name: "pollo", category: "carnes", prices: [1800, 1700] }
];

function displayAllItems() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.forEach(item => {
        const minPrice = Math.min(...item.prices);
        const div = document.createElement('div');
        div.textContent = `${item.name} - ${item.category} - $${minPrice}`;
        div.classList.add('item');
        div.dataset.category = item.category;
        div.dataset.price = minPrice;
        resultsContainer.appendChild(div);
    });
}

function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.textContent.toLowerCase();
        const itemCategory = item.dataset.category;

        // Check if the query matches either the name or the category
        const matchesQuery = itemName.includes(query) || itemCategory.includes(query);
        const matchesCategory = !category || itemCategory === category;

        // Toggle visibility based on all conditions
        item.classList.toggle('hidden', !(matchesQuery && matchesCategory));
    });
}

window.onload = displayAllItems;
