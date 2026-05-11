export class GetFavorites {
    constructor(repository) {
        this.repository = repository;
    }

    async execute() {
        return this.repository.getAll();
    }
}