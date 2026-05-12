import { UIState } from '../../shared/ui-state.js';

export class DetailController {
    constructor(getCocktailById, addToFavorites, removeFromFavorites, getFavorites) {
        this.getCocktailById = getCocktailById;
        this.addToFavorites = addToFavorites;
        this.removeFromFavorites = removeFromFavorites;
        this.getFavorites = getFavorites;
        this.state = {
            status: UIState.idle,
            cocktail: null,
            isFavorite: false,
            error: null,
        };
        this.listeners = [];
    }

    subscribe(fn) {
        this.listeners.push(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.state));
    }

    async load(id) {
        this.state = { ...this.state, status: UIState.loading };
        this.notify();

        try {
            const cocktail = await this.getCocktailById.execute(id);
            if (!cocktail) {
                this.state = {
                    status: UIState.error,
                    cocktail: null,
                    isFavorite: false,
                    error: 'Коктейль не найден',
                };
            } else {
                const favorites = await this.getFavorites.execute();
                const isFavorite = favorites.some(f => f.id === cocktail.id);
                this.state = {
                    status: UIState.success,
                    cocktail: cocktail,
                    isFavorite: isFavorite,
                    error: null,
                };
            }
        } catch (e) {
            this.state = {
                status: UIState.error,
                cocktail: null,
                isFavorite: false,
                error: e.message,
            };
        }
        this.notify();
    }

    async toggleFavorite() {
        if (!this.state.cocktail) return;

        if (this.state.isFavorite) {
            await this.removeFromFavorites.execute(this.state.cocktail.id);
            this.state = { ...this.state, isFavorite: false };
        } else {
            await this.addToFavorites.execute(this.state.cocktail);
            this.state = { ...this.state, isFavorite: true };
        }
        this.notify();
    }
}