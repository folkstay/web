export const routes = {
    list: '/',
    detail: (id) => `/service/${id}`
};

export function parceLocation() {
    const path = window.location.pathname;

    if (path.startsWith('/service/')) {
        return {
            view: 'detail',
            serviceId: path.split('/')[2]
        };
    } else {
        return {
            view: 'list',
            serviceId: null
        };
    }
}