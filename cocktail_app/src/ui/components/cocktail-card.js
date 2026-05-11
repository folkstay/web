export function CocktailCard(cocktail) {
    return `
        <div class="cocktail-card" data-id="${cocktail.id}">
            <img src="${cocktail.image}" alt="${cocktail.name}">
            <div class="cocktail-card-body">
                <h3>${cocktail.name}</h3>
                <p class="cocktail-meta">${cocktail.category || ''} • ${cocktail.alcoholic || ''}</p>
            </div>
        </div>
    `;
}