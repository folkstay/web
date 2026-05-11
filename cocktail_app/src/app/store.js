export const store = {
    state: {
        view: 'search',
        cocktailId: null,
        searchQuery: ''
    },
    listeners: [],

    setState(patch) {
        this.state = { ...this.state, ...patch };
        this.listeners.forEach(fn => fn(this.state));
    },

    subscribe(fn) {
        this.listeners.push(fn);
    }
};