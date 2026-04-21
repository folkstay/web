class ServiceRepository{
    constructor(storageKey="service_key"){
        this.storageKey=storageKey;
        this._initMockIfNeeded();
    }

    _initMockIfNeeded(){
        const existing=localStorage.getItem(this.storageKey);

        if(!existing){
            const mockService =[
                new ServiceEntity(1, 'Веб-аудит доступности', 'Проверка сайта на WCAG 2.1', 
                    'Полный аудит интерфейса для людей с ограничениями: скринридеры, контраст, навигация. Отчёт с приоритетами.', 
                    '29 900 ₽', '5-7 дней', 'Аудит'),
                new ServiceEntity(2, 'Разработка микросервиса на Go', 'Создание масштабируемого backend-сервиса', 
                    'Проектирование REST/gRPC API, подключение к БД, контейнеризация Docker, документация OpenAPI.', 
                    '89 000 ₽', '14 дней', 'Разработка'),
                new ServiceEntity(3, 'UI/UX-рефакторинг', 'Реорганизация интерфейса на основе UX-метрик', 
                    'Анализ поведения пользователей, дизайн-система, прототипирование, внедрение компонентов Clean UI.', 
                    '64 500 ₽', '10 дней', 'Дизайн'),
                new ServiceEntity(4, 'Консультация по чистой архитектуре', 'Рефакторинг legacy-кода и внедрение DDD', 
                    'Экспертная сессия: анализ проекта, построение слоёв, CI/CD-советы.', 
                    '15 000 ₽', '2 часа', 'Консалтинг'),
                new ServiceEntity(5, 'Автоматизация тестирования', 'Настройка пайплайнов E2E + Unit', 
                    'Внедрение Jest, Playwright, GitHub Actions. Повышение покрытия кода.', 
                    '49 900 ₽', '6 дней', 'QA'),
            ];

            localStorage.setItem(this.storageKey,JSON.stringify(mockService));
        }
    }

    getAll(){
        const row = localStorage.getItem(this.storageKey);

        if(!raw) return [];

        const parseData = JSON.parse(raw);

        return parsedData.map(item => new ServiceEntity(
            item._id,
            item.title,
            item.shortDesc,
            item.fullDesc,
            item.price,
            item.duration,
            item.category
        ));
    }

    getById(id){
        const all=this.getAll();

        return all.find(sevice => service.id === id) || null;
    }

    saveAll(services){
        localStorage.setItem(this.storageKey,JSON.stringify(servives));
    }
}