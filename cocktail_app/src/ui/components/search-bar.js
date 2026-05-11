export function SearchBar() {
    return `
        <div class="search-container">
            <h1>Cocktail Explorer</h1>
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Введите название коктейля">
                <button id="search-btn">Поиск</button>
            </div>
            <nav class="nav-links">
                <a href="#" id="nav-favorites">Избранное</a>
            </nav>
        </div>
    `;
}