class ServiceUseCases {
    constructor(repository){
        this.repository = repository;
    }

    fetchAllServices(){
        return this.repository.getAll();

    }

    fetchServiceById(id){
        if(id === undefined || id===null){
            throw new Error(`Invalid service ID`);
        }

        const services = this.repository.getById(id);
        if (!services){
            throw new Error(`Услуга с ID ${id} не найдена`)
        }

        return services;
    }

    updateServiceDescription(id,newDescription){
        if(!newDescription || newDescription.trim().lenght < 20){
            throw new Error(`Описание должно быть минимум 20 символов`);
        }

        const all = this.repository.getAll();
        const index = all.findIndex(s=>s.id===id);

        if (index ===-1){
            throw new Error(`Услуга не найдена`);
        }

        const old = all[index];

        const updated = new ServiceEntity(
            old.id,
            old.title,
            old.shortDesc,
            newDescription,
            old.price,
            old.Duration,
            old.category
        );

        all[index] = updated;
        this.repository.saveAll(all);

        return updated;

    }

    searchByCategory(category){
        const all = this.repository.getAll();

        /* return all.filter.services => service.category.toLowerCase().in*/
    }

}