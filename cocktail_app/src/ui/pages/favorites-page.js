import { CocktailCard } from '../components/cocktail-card.js';
import { FavoritesController } from '../controllers/favorites-controller.js';
import { store } from '../../app/store.js';

export class FavoritesPage {
    constructor(getFavorites, removeFromFavorites) {
        this.controller = new FavoritesController(getFavorites, removeFromFavorites);
    }

    render(root) {
        this.root = root;

        this.controller.subscribe((state) => {
            this.update(state);
        });

        this.controller.load();
    }

    update(state) {
        if (state.status === 'loading') {
            this.root.innerHTML = '<div class="loading">Загрузка...</div>';
            return;
        }

        if (state.status === 'error') {
            this.root.innerHTML = '<p class="error">Ошибка загрузки избранного</p>';
            return;
        }

        if (state.status === 'success') {
            this.root.innerHTML = `
                <div class="favorites-container">
                    <div class="favorites-header">
                        <button id="back-to-search" class="back-btn">← Назад к поиску</button>
                        <h1>❤️ Избранные коктейли</h1>
                    </div>
                    <div id="favorites-grid" class="results-grid">
                        ${state.data.length === 0
                            ? '<p class="empty-message">Пока нет избранных коктейлей</p>'
                            : state.data.map(c => CocktailCard(c)).join('')}
                    </div>
                </div>
            `;

            this.root.querySelector('#back-to-search').addEventListener('click', () => {
                store.setState({ view: 'search', cocktailId: null });
            });

            this.root.querySelectorAll('.cocktail-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.dataset.id);
                    store.setState({ view: 'detail', cocktailId: id });
                });
            });
        }
    }
}