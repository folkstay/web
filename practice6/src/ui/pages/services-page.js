import { UIState } from "../../shared/ui-state.js";
import { ServicesList } from "../components/service/services-list.js";
import { store } from "../state/store.js";

export class ServicesPage {
    constructor(getServices) {
        this.getServices = getServices;
        this.state = {
            status: UIState.idle,
            data: [],
            error: null,
        }
    }

    async render(root) {
        this.state.status = UIState.loading;
        // TODO: Доработать стили
        root.innerHTML = `<p>Loading...</p>`;

        try {
            const services = await this.getServices.execute();
            this.state = {
                status: UIState.success,
                data: services,
                error: null,
            }

            const content = ServicesList(services);
            root.innerHTML = content;

            const cards = document.querySelectorAll('.service-card');

            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const id = parseInt(card.dataset.serviceId);

                    store.setState({ view: 'detail', serviceId: id });
                });
            });
        } catch (e) {
            this.state = {
                status: UIState.error,
                data: [],
                error: e,
            }

            // TODO: Доработать стили
            root.innerHTML = `<p>Error...\nTry again</p>`;
            //TODO: по нажатию обновлять страницу
        }
    }
}