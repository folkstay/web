import { CocktailCard } from '../components/cocktail-card.js';
import { store } from '../../app/store.js';

export class FavoritesPage {
    constructor(getFavorites, removeFromFavorites) {
        this.getFavorites = getFavorites;
        this.removeFromFavorites = removeFromFavorites;
    }

    async render(root) {
        const favorites = await this.getFavorites.execute();

        root.innerHTML = `
            <div class="favorites-container">
                <div class="favorites-header">
                    <button id="back-to-search" class="back-btn">← Назад к поиску</button>
                    <h1>Избранные коктейли</h1>
                </div>
                <div id="favorites-grid" class="results-grid">
                    ${favorites.length === 0
                        ? '<p class="empty-message">Пока нет избранных коктейлей 🍸</p>'
                        : favorites.map(c => CocktailCard(c)).join('')}
                </div>
            </div>
        `;

        root.querySelector('#back-to-search').addEventListener('click', () => {
            store.setState({ view: 'search', cocktailId: null });
        });

        root.querySelectorAll('.cocktail-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                store.setState({ view: 'detail', cocktailId: id });
            });
        });
    }
}