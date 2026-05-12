import { CocktailDetail } from '../components/cocktail-detail.js';
import { DetailController } from '../controllers/detail-controller.js';
import { store } from '../../app/store.js';

export class DetailPage {
    constructor(getCocktailById, addToFavorites, removeFromFavorites, getFavorites) {
        this.controller = new DetailController(getCocktailById, addToFavorites, removeFromFavorites, getFavorites);
    }

    render(root, state) {
        this.root = root;
        this.root.innerHTML = '<div class="loading">Загрузка...</div>';

        this.controller.subscribe((ctrlState) => {
            this.update(ctrlState);
        });

        this.controller.load(state.cocktailId);
    }

    update(state) {
        if (state.status === 'loading') {
            this.root.innerHTML = '<div class="loading">Загрузка...</div>';
            return;
        }

        if (state.status === 'error') {
            this.root.innerHTML = `<p class="error">Ошибка: ${state.error}</p>`;
            return;
        }

        if (state.status === 'success' && state.cocktail) {
            this.root.innerHTML = CocktailDetail(state.cocktail, state.isFavorite);

            this.root.querySelector('#back-btn').addEventListener('click', () => {
                store.setState({ view: 'search', cocktailId: null });
            });

            this.root.querySelector('#fav-btn').addEventListener('click', () => {
                this.controller.toggleFavorite();
            });
        }
    }
}