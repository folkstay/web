import { store } from './store.js';
import { CocktailRepositoryImpl } from '../data/repositories/cocktail-repository-impl.js';
import { FavoriteRepositoryImpl } from '../data/repositories/favorite-repository-impl.js';
import { SearchByName } from '../domain/use-cases/search-by-name.js';
import { GetCocktailById } from '../domain/use-cases/get-cocktail-by-id.js';
import { AddToFavorites } from '../domain/use-cases/add-to-favorites.js';
import { RemoveFromFavorites } from '../domain/use-cases/remove-from-favorites.js';
import { GetFavorites } from '../domain/use-cases/get-favorites.js';
import { SearchPage } from '../ui/pages/search-page.js';
import { DetailPage } from '../ui/pages/detail-page.js';
import { FavoritesPage } from '../ui/pages/favorites-page.js';

const cocktailRepository = new CocktailRepositoryImpl();
const favoriteRepository = new FavoriteRepositoryImpl();

const searchByName = new SearchByName(cocktailRepository);
const getCocktailById = new GetCocktailById(cocktailRepository);
const addToFavorites = new AddToFavorites(favoriteRepository);
const removeFromFavorites = new RemoveFromFavorites(favoriteRepository);
const getFavorites = new GetFavorites(favoriteRepository);

const pages = {
    search: new SearchPage(searchByName),
    detail: new DetailPage(getCocktailById, addToFavorites, removeFromFavorites, getFavorites),
    favorites: new FavoritesPage(getFavorites, removeFromFavorites)
};

function render(state) {
    const rootElement = document.getElementById('app-root');
    const page = pages[state.view];
    if (page) {
        page.render(rootElement, state);
    }
}

store.subscribe(render);
render(store.state);