export const store = {
    state: {
        view: 'list',
        serviceId: null,
    },

    listeners: [],

    setState(patch) {
        this.state = patch;
        this.listeners.forEach(l => l(this.state));
    },

    subscribe(fn) {
        this.listeners.push(fn);
    }
};