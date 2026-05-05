import { UIState } from "../../shared/ui-state.js";
import { ServicesList } from "../components/service/services-list.js";
import { ServiceController } from "../controllers/service-controller.js";
import { store } from "../state/store.js";

export class ServicesPage {
    constructor(getServices) {
        this.controller = new ServiceController(getServices);
    }

    render(root) {
        this.root = root;

        this.controller.subscribe((state) => {
            this.update(state);
        });

        this.controller.load();
    }

    update(state) {
        if (state.status === UIState.loading) {
            this.root.innerHTML = `<p>Loading...</p>`;
            return;
        }

        if (state.status === UIState.error) {
            this.root.innerHTML = `<p>Error...\nTry again</p>`;
            return;
        }

        const content = ServicesList(state.data);
        this.root.innerHTML = content;

        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const id = parseInt(card.dataset.serviceId);
                store.setState({ view: 'detail', serviceId: id });
            });
        });
    }
}