export class SearchByName {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(query) {
        if (!query || query.length < 1) return [];
        return this.repository.searchByName(query);
    }
}