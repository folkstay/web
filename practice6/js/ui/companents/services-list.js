function renderServicesList(services, onServiceClick){
    const servicesHtml = services.map(services => `
        <div class ="sevice-card" data-service-id="${service.id}">
            <div class ="service-title">${escapeHtml(services.title)}</div>
            <div class ="service-desc-short">${escapeHtml(services.shortDesc)}</div>
            <div class ="service-badge">${escapeHtml(services.category)}</div>
            <div class ="service-service-price">${escapeHtml(services.price)}</div>
            </div>     
        `);

        return `
            ${renderNavgation('services')}
            <div class="servives-grid" id="services-grid">
            </div>
        `;
}

function escapeHtml(str){
    if(!str) return '';

    return str.replace(/[&<>]/g,function(m){
        if(m==='&') return "&amp"
        if(m==='<') return "&lt"
        if(m==='>') return "&gt"
        return m;
    })
}

function attachServiceCardListener(onServiceClick){
    const cards = document.querySelectorAll('.service-card')

    cards.forEach(card=>{
        card.addEventListener('click', (e)=>{
            const id = parseInt(card.dataset.serviceId)

            if(onServiceClick) onServiceClick(id);
            
        });
    })
}