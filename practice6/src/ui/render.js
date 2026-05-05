import styles from './... .css';

function renderApp(contentHtml) {
    const appRoot = document.getElementById('app-root');

    if (appRoot) {
        appRoot.innerHTML = contentHtml;
    }
}

function renderLoading() {
    renderApp(`
        <div>
            Загрузка услуг...
        </div>
        `);
}

function renderError(message) {
    renderApp(`
        <div class="error-message">
            Ошибка: ${message}
        </div>
        `);
}

function renderEmpty() {
    renderApp(`
        <div class="empty-message">
            Нет доступных услуг
        </div>
        `);
}

// function loadStyles() {
//     const link = document.createElement('link');
//     link.id = 'detail-style';
//     link.rel = 'stylesheet';
//     link.href='./...';

//     document.head.appendChild(link);

// }