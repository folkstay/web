import { UIState } from '../../shared/ui-state.js';

export class CocktailController {
    constructor(searchByName) {
        this.searchByName = searchByName;
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

    async search(query) {
        this.state = { ...this.state, status: UIState.loading };
        this.notify();

        try {
            const data = await this.searchByName.execute(query);
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