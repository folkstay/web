export class GetServices {
    constructor(repository) {
        this.repository = repository;
    }

    async execute() {
        const services = this.repository.getAll();

        return services;
    }
}