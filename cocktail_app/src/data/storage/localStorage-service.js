const FAVORITES_KEY = 'cocktail-favorites';

export function loadFavorites() {
    try {
        const jsonString = localStorage.getItem(FAVORITES_KEY);
        return jsonString ? JSON.parse(jsonString) : [];
    } catch {
        return [];
    }
}

export function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}