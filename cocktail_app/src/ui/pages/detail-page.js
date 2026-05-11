import { CocktailDetail } from '../components/cocktail-detail.js';
import { store } from '../../app/store.js';

export class DetailPage {
    constructor(getCocktailById, addToFavorites, removeFromFavorites, getFavorites) {
        this.getCocktailById = getCocktailById;
        this.addToFavorites = addToFavorites;
        this.removeFromFavorites = removeFromFavorites;
        this.getFavorites = getFavorites;
    }

    async render(root, state) {
        root.innerHTML = '<div class="loading">Загрузка...</div>';

        try {
            const cocktail = await this.getCocktailById.execute(state.cocktailId);
            if (!cocktail) {
                root.innerHTML = '<p class="error">Коктейль не найден</p>';
                return;
            }

            const favorites = await this.getFavorites.execute();
            const isFavorite = favorites.some(f => f.id === cocktail.id);

            root.innerHTML = CocktailDetail(cocktail, isFavorite);

            root.querySelector('#back-btn').addEventListener('click', () => {
                store.setState({ view: 'search', cocktailId: null });
            });

            root.querySelector('#fav-btn').addEventListener('click', async () => {
                const btn = root.querySelector('#fav-btn');
                if (btn.classList.contains('active')) {
                    await this.removeFromFavorites.execute(cocktail.id);
                    btn.classList.remove('active');
                    btn.textContent = '🤍';
                } else {
                    await this.addToFavorites.execute(cocktail);
                    btn.classList.add('active');
                    btn.textContent = '❤️';
                }
            });
        } catch (e) {
            root.innerHTML = `<p class="error">Ошибка: ${e.message}</p>`;
        }
    }
}