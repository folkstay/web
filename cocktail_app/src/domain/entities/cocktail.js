export class Cocktail {
    constructor({ idDrink, strDrink, strCategory, strAlcoholic,
                  strGlass, strInstructions, strDrinkThumb,
                  ingredients = [] }) {
        this.id = parseInt(idDrink);
        this.name = strDrink;
        this.category = strCategory;
        this.alcoholic = strAlcoholic;
        this.glass = strGlass;
        this.instructions = strInstructions;
        this.image = strDrinkThumb;
        this.ingredients = ingredients;
    }

    getShortDescription() {
        return `${this.alcoholic} • ${this.category} • ${this.glass}`;
    }

    getIngredientList() {
        return this.ingredients
            .filter(i => i.name)
            .map(i => `${i.measure || ''} ${i.name}`.trim())
            .join(', ');
    }

    clone() {
        return new Cocktail({ ...this });
    }
}