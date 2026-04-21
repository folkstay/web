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
        renderError(error.message)
    }
}

function attachNavListener(){
    const navLinks = document.querySelectorAll('[data-nav]');

    navLinks.forEach(link =>{
        link.removeEventListener('click', ___);
        link.addEventListener('click', ___);
    })

function handleNavClick(e){
    const nav = e.currentTarget.dataset.nav;

    if (nav === 'services'){
        currentView='list';
        currentServiceId=null;
        render();

    }

}    

// window.addEventListener(){
//     render();
// };

}