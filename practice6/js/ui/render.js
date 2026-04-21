function renderApp(contentHtml){
    const appRoot = document.getElementById('app-root');

    if(appRoot){
        appRoot.innerHTML= contentHtml;
    }
}

function renderLoading(){
    renderApp(`
        <div>
            Загрузка услуг....
        </div>
        `);

}

function renderError(message){
        renderApp(`
        <div class="error-message"> 
            Ошибка ${message}....
        </div>
        `);

}

function renderEmpty(message){
        renderApp(`
        <div class="empty-message"> 
            Нет доступных услуг....
        </div>
        `);

}