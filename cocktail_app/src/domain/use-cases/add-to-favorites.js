export class AddToFavorites {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(cocktail) {
        await this.repository.add(cocktail);
    }
}