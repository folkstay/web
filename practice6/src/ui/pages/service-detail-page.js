import { ServiceDetail } from "../components/service/service-detail.js";
import { store } from "../state/store.js";

export class ServiceDetailPage {
    constructor(getServiceById) {
        this.getServiceById = getServiceById;
    }

    async render(root, state) {
        // TODO: Доработать стили
        root.innerHTML = `<p>Loading...</p>`;

        try {
            const service = await this.getServiceById.execute(state.serviceId);

            if (!service) {
                throw new Error('Not found');
            }

            const content = ServiceDetail(service);
            root.innerHTML = content;

            const cards = document.querySelectorAll('.service-back');

            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    store.setState({ view: 'list', serviceId: null });
                });
            });
        } catch (e) {
            // TODO: Доработать стили
            root.innerHTML = `<p>Error (${e})...\nTry again</p>`;
            //TODO: по нажатию обновлять страницу
        }
    }
}