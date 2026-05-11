const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function searchByName(query) {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.drinks || [];
}

export async function getById(id) {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.drinks ? data.drinks[0] : null;
}