import { UIState } from '../../shared/ui-state.js';

export class FavoritesController {
    constructor(getFavorites, removeFromFavorites) {
        this.getFavorites = getFavorites;
        this.removeFromFavorites = removeFromFavorites;
        this.state = {
            status: UIState.idle,
            data: [],
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

    async load() {
        this.state = { ...this.state, status: UIState.loading };
        this.notify();

        try {
            const data = await this.getFavorites.execute();
            this.state = {
                status: UIState.success,
                data: data,
                error: null,
            };
        } catch (e) {
            this.state = {
                status: UIState.error,
                data: [],
                error: e,
            };
        }
        this.notify();
    }
}