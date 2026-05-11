import { UIState } from '../../shared/ui-state.js';
import { SearchBar } from '../components/search-bar.js';
import { CocktailCard } from '../components/cocktail-card.js';
import { store } from '../../app/store.js';

export class SearchPage {
    constructor(searchByName) {
        this.searchByName = searchByName;
    }

    async render(root) {
        root.innerHTML = `
            ${SearchBar()}
            <div id="results" class="results-grid"></div>
            <div id="loading" class="loading hidden">Загрузка...</div>
            <div id="error" class="error hidden"></div>
        `;

        this.bindEvents(root);
    }

    bindEvents(root) {
        const searchBtn = root.querySelector('#search-btn');
        const searchInput = root.querySelector('#search-input');
        const navFavorites = root.querySelector('#nav-favorites');

        searchBtn.addEventListener('click', () => this.performSearch(root));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch(root);
        });

        navFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            store.setState({ view: 'favorites' });
        });
    }

    async performSearch(root) {
        const input = root.querySelector('#search-input');
        const query = input.value.trim();
        if (!query) return;

        const resultsDiv = root.querySelector('#results');
        const loadingDiv = root.querySelector('#loading');
        const errorDiv = root.querySelector('#error');

        resultsDiv.innerHTML = '';
        errorDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        try {
            const cocktails = await this.searchByName.execute(query);

            loadingDiv.classList.add('hidden');

            if (!cocktails || cocktails.length === 0) {
                resultsDiv.innerHTML = '<p class="empty-message">Ничего не найдено</p>';
                return;
            }

            resultsDiv.innerHTML = cocktails
                .map(c => CocktailCard(c))
                .join('');

            resultsDiv.querySelectorAll('.cocktail-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.dataset.id);
                    store.setState({ view: 'detail', cocktailId: id });
                });
            });
        } catch (e) {
            loadingDiv.classList.add('hidden');
            errorDiv.classList.remove('hidden');
            errorDiv.textContent = 'Ошибка загрузки. Попробуйте ещё раз.';
        }
    }
}