
import { activateClass, deactivateClass, getDeepCopy } from './utils.js';

window.addEventListener('load', async () => {
    try {
        const body = document.querySelector('body');
        const togglerOpenButton = document.querySelectorAll('.open-search-form-button');
        const togglerCloseButton = document.querySelector('.close-search-form-button');
        const input = document.querySelector('.search-form-input');

        const partialProductSection = 'partial-product-section';
        const blackScreen = 'black-screen';
        const searchSection = 'search-form-container'; //Es la seccion donde se encuentran el buscador
        const sideNavbar = 'side-navbar-container';
        const header = 'header';

        const listenSearchResult = () => { //Funcion que escucha el <a> de mostrar todos los resultados de busqueda
            const searchResultButton = document.querySelector('.more-results-msg');
            // Agarro el form para hacer un submit
            const form = document.querySelector('.search-input-container');
            searchResultButton.addEventListener('click', (e) => {
                e.preventDefault();
                form.submit(); //Mando el formulario
            });
        };
        const appendHiddenInputIds = (products) => { //Agrega los id de los productos que encontro la busqueda
            // Establecer el valor del campo oculto
            const idsInput = document.querySelector('#ids-input');
            const productsIds = [];
            products.forEach(prod => { //Pusheo los ids de los productos que encontro
                productsIds.push(prod.id);
            });
            idsInput.value = JSON.stringify(productsIds);
        }

        togglerOpenButton.forEach(btn=>{
            btn.addEventListener('click', () => { // Si abre el searchForm
                let classesToActivate = [/*blackScreen,*/ searchSection];
                activateClass(classesToActivate);
    
                let classesToDeactivate = [sideNavbar];
                deactivateClass(classesToDeactivate);
    
                input.focus(); //Asi el input ya esta para escribir
                // body.classList.add('noScroll');//Para que no me deje scrollear    
            })
        })
        

        togglerCloseButton.addEventListener('click', () => { //Si toca la x
            input.value = ''; //Borro el contenido del input
            // body.classList.remove('noScroll');//Para que no me deje scrollear

            let classesToDeactivate = [searchSection/*, blackScreen, partialProductSection*/];
            deactivateClass(classesToDeactivate);
        });
        document.querySelector(`.${blackScreen}`).addEventListener('click', () => { //Si toca la pantalla negra
            input.value = ''; //Borro el contenido del input
            body.classList.remove('noScroll');//Para que no me deje scrollear

            let classesToDeactivate = [searchSection, blackScreen];
            deactivateClass(classesToDeactivate);

        });


       
    } catch (error) {
        return console.log(`Falle en searchForm.js: ${error}`);
    }
})