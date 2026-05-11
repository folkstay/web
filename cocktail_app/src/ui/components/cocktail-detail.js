export function CocktailDetail(cocktail, isFavorite) {
    const ingredientsHtml = cocktail.ingredients
        .filter(i => i.name)
        .map(i => `
            <li class="ingredient-item">
                <span class="ingredient-measure">${i.measure || ''}</span>
                <span class="ingredient-name">${i.name}</span>
            </li>
        `).join('');

    return `
        <div class="detail-container">
            <button class="back-btn" id="back-btn">← Назад</button>
            <div class="detail-card">
                <div class="detail-image-container">
                    <img src="${cocktail.image}" alt="${cocktail.name}" class="detail-image">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" id="fav-btn">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="detail-body">
                    <h1>${cocktail.name}</h1>
                    <div class="detail-meta">
                        <span class="badge">${cocktail.category || 'Unknown'}</span>
                        <span class="badge">${cocktail.alcoholic || 'Unknown'}</span>
                        <span class="badge">${cocktail.glass || 'Any glass'}</span>
                    </div>
                    <div class="ingredients-section">
                        <h3>Ингредиенты</h3>
                        <ul class="ingredients-list">${ingredientsHtml}</ul>
                    </div>
                    <div class="instructions-section">
                        <h3>Инструкция</h3>
                        <p>${cocktail.instructions || 'No instructions available.'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}