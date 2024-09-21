const data = [
    "Super Mario Bros",
    "The Legend of Zelda",
    "Minecraft",
    "Fortnite",
    "Call of Duty",
    "Overwatch",
    "League of Legends",
    "Apex Legends",
    "Valorant",
    "Cyberpunk 2077"
];

function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = data.filter(item => item.toLowerCase().includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const div = document.createElement('div');
            div.textContent = result;
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.textContent = 'No se encontraron resultados';
    }
}
