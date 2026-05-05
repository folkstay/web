import { UIState } from "../../shared/ui-state.js";

export class ServiceController {
    constructor(getService) {
        this.getService = getService;
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
            const data = await this.getService.execute();

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