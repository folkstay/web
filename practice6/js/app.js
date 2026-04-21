const repository = new ServiceRepository();

const useCases = new ServiceUseCases(repository);

let currentView = 'list';

let currentServiceId = null;

async function render(){
    try{
        if(currentView === 'list'){
            const services = useCases.fetchAllServices();
            const content = renderServicesList(services, (id) =>{
                currentView = 'detail';
                currentServiceId = id;
                render();

            });

            renderApp(content);
            attachServiceCardListener((id) =>{
                currentView = 'detail';
                currentServiceId = id;
                render();

            });

        } else if (currentView === 'detail'){
            

        }
    } catch (error){
        renderError()
    }
}
