import { ServiceRepository } from "../../domain/repositories/service-repository.js";
import { fetchServices } from "../api/service-api.js";

export class ServiceRepositoryImpl extends ServiceRepository {
    async getAll() {
        const data = await fetchServices();

        return data;
    }

    async getById(id) {
        const data = await fetchServices();

        return data.find(s => s.id === id);
    }
}
