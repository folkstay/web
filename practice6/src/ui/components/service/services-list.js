export function ServicesList(services) {
    const servicesHtml = services.map(service => `
        <div class="service-card" data-service-id="${service.id}">
            <div class="service-title">${service.title}</div>
            <div class="service-desc-short">${service.shortDesc}</div>
            <div class="service-price">${service.price}</div>
            <div class="badge">${service.category}</div>
        </div>
        `).join('');

    return `
        <div class="services-grid" id="services-grid">
            ${servicesHtml}
        </div>
    `;
}
