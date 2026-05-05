import { ServiceRepositoryImpl } from "../data/repositories/service-repository-impl.js";
import { GetServiceById } from "../domain/use-cases/services/get-service-by-id.js";
import { GetServices } from "../domain/use-cases/services/get-services.js";
import { ServiceDetailPage } from "../ui/pages/service-detail-page.js";
import { ServicesPage } from "../ui/pages/services-page.js";
import { store } from "../ui/state/store.js";

const repository = new ServiceRepositoryImpl();
const getServices = new GetServices(repository);
const getServiceById = new GetServiceById(repository);

const root = document.getElementById('app-root');

const pages = {
    list: new ServicesPage(getServices),
    detail: new ServiceDetailPage(getServiceById),
};

function render(state) {
    const page = pages[state.view];

    page.render(root, state);
}

store.subscribe(render);
render(store.state);