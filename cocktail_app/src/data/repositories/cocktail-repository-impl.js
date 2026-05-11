import { CocktailRepository } from '../../domain/repositories/cocktail-repository.js';
import * as api from '../api/cocktail-api.js';
import { Cocktail } from '../../domain/entities/cocktail.js';

function parseIngredients(drink) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const name = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (name) {
            ingredients.push({
                name: name.trim(),
                measure: measure ? measure.trim() : ''
            });
        }
    }
    return ingredients;
}

export class CocktailRepositoryImpl extends CocktailRepository {
    async searchByName(query) {
        const data = await api.searchByName(query);
        return data.map(d => new Cocktail({ ...d, ingredients: parseIngredients(d) }));
    }

    async getById(id) {
        const data = await api.getById(id);
        if (!data) return null;
        return new Cocktail({ ...data, ingredients: parseIngredients(data) });
    }
}