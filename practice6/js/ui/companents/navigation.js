function renderNavgation(activeTab = "services"){
    return`
        <div class="nav-links">
            <div class="nav-link ${activeTab==='services' ? 'active' : ''}" data-nav="services">
                Список услуг
            </div>
        </div>
    `;
}