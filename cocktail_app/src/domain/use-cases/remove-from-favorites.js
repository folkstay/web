export class RemoveFromFavorites {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id) {
        await this.repository.remove(id);
    }
}