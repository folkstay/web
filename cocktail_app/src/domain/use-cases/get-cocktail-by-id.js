export class GetCocktailById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id) {
        return this.repository.getById(id);
    }
}