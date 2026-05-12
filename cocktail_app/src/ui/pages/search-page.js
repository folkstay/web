import { CocktailCard } from '../components/cocktail-card.js';
import { SearchBar } from '../components/search-bar.js';
import { CocktailController } from '../controllers/cocktail-controller.js';
import { store } from '../../app/store.js';

export class SearchPage {
    constructor(searchByName) {
        this.controller = new CocktailController(searchByName);
    }

    render(root) {
        this.root = root;
        root.innerHTML = `
            ${SearchBar()}
            <div id="results" class="results-grid"></div>
            <div id="loading" class="loading hidden">Загрузка...</div>
            <div id="error" class="error hidden"></div>
        `;

        this.controller.subscribe((state) => {
            this.update(state);
        });

        this.bindEvents();
    }

    bindEvents() {
        const searchBtn = this.root.querySelector('#search-btn');
        const searchInput = this.root.querySelector('#search-input');
        const navFavorites = this.root.querySelector('#nav-favorites');

        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) this.controller.search(query);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) this.controller.search(query);
            }
        });

        navFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            store.setState({ view: 'favorites' });
        });
    }

    update(state) {
        if (state.status === 'loading') {
            this.root.querySelector('#results').innerHTML = '';
            this.root.querySelector('#error').classList.add('hidden');
            this.root.querySelector('#loading').classList.remove('hidden');
            return;
        }

        if (state.status === 'error') {
            this.root.querySelector('#loading').classList.add('hidden');
            this.root.querySelector('#error').classList.remove('hidden');
            return;
        }

        if (state.status === 'success') {
            this.root.querySelector('#loading').classList.add('hidden');
            this.root.querySelector('#error').classList.add('hidden');

            const resultsDiv = this.root.querySelector('#results');

            if (!state.data || state.data.length === 0) {
                resultsDiv.innerHTML = '<p class="empty-message">Ничего не найдено 🍹</p>';
                return;
            }

            resultsDiv.innerHTML = state.data
                .map(c => CocktailCard(c))
                .join('');

            resultsDiv.querySelectorAll('.cocktail-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.dataset.id);
                    store.setState({ view: 'detail', cocktailId: id });
                });
            });
        }
    }
}