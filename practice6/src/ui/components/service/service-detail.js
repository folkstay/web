export function ServiceDetail(service) {
    //TODO Сделать покрасивее кнопочку назад
    return `
        <div class="service-card" data-service-id="${service.id}">
            <p class="service-back">⬅</p>
            <div class="service-title">${service.title}</div>
            <div class="service-desc-short">${service.shortDesc}</div>
            <div class="service-price">${service.price}</div>
            <div class="badge">${service.category}</div>
        </div>
        `;
}