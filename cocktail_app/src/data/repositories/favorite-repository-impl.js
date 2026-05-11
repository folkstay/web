import { FavoriteRepository } from '../../domain/repositories/favorite-repository.js';
import { loadFavorites, saveFavorites } from '../storage/localStorage-service.js';

export class FavoriteRepositoryImpl extends FavoriteRepository {
    async getAll() {
        return loadFavorites();
    }

    async add(cocktail) {
        const favorites = await this.getAll();
        if (!favorites.find(f => f.id === cocktail.id)) {
            favorites.push({
                id: cocktail.id,
                name: cocktail.name,
                image: cocktail.image,
                category: cocktail.category,
                alcoholic: cocktail.alcoholic
            });
            saveFavorites(favorites);
        }
    }

    async remove(id) {
        let favorites = await this.getAll();
        favorites = favorites.filter(f => f.id !== id);
        saveFavorites(favorites);
    }

    async isFavorite(id) {
        const favorites = await this.getAll();
        return favorites.some(f => f.id === id);
    }
}