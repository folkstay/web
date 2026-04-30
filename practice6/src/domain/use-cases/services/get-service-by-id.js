export class GetServiceById {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id) {
        const service = this.repository.getById(id);

        return service;
    }
}