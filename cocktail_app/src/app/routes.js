export function parseLocation() {
    const path = window.location.pathname;

    if (path.startsWith('/cocktail/')) {
        return {
            view: 'detail',
            cocktailId: parseInt(path.split('/')[2])
        };
    } else if (path === '/favorites') {
        return {
            view: 'favorites',
            cocktailId: null
        };
    } else {
        return {
            view: 'search',
            cocktailId: null
        };
    }
}