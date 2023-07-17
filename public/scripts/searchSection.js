
import { activateClass, deactivateClass, getDeepCopy } from './utils.js';

window.addEventListener('load', async () => {
    try {
        const body = document.querySelector('body');
        const togglerOpenButton = document.querySelectorAll('.open-search-form-button');
        const togglerCloseButton = document.querySelectorAll('.close-search-form-button');

        const partialProductSection = 'partial-product-section';
        const blackScreen = 'black-screen';
        const searchSection = 'search-form-container'; //Es la sección donde se encuentran el buscador
        const sideNavbar = 'side-navbar-container';
        const header = 'header';

        const listenSearchResult = () => { //Función que escucha el <a> de mostrar todos los resultados de busqueda
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

        togglerOpenButton.forEach(btn => {
            btn.addEventListener('click', () => { // Si abre el searchForm
                if (window.innerWidth < 768 && btn.classList.contains('lupa-mobile')) {//Resolución mobile
                    btn.classList.add('open-search-form-button-active');
                }

                document.querySelectorAll(`.${searchSection}`).forEach(cont => cont.classList.add(`${searchSection}-active`))

                let classesToDeactivate = [sideNavbar];
                deactivateClass(classesToDeactivate);
                let input = btn.closest('.search-section-container').querySelector('.search-form-input');
                input.focus(); //Asi el input ya esta para escribir
                // body.classList.add('noScroll');//Para que no me deje scrollear    
            })
        })


        togglerCloseButton.forEach(btn => {
            btn.addEventListener('click', () => { //Si toca la x
                let input = btn.closest('.search-form-container').querySelector('.search-form-input')
                input.value = ''; //Borro el contenido del input
                // body.classList.remove('noScroll');//Para que no me deje scrollear

                document.querySelectorAll(`.${searchSection}`).forEach(cont => cont.classList.remove(`${searchSection}-active`))

                document.querySelector('.lupa-mobile').classList.remove('open-search-form-button-active');
            })
        });

        // Logica para mandar el formulario
        const sendSearchBtn = document.querySelectorAll('.send-search-form-button');
        sendSearchBtn.forEach(btn=>{
            // Envian el buscador
            btn.addEventListener('click',()=>{
                // Capturo el form ese para mandarlo (hay varios)
                const form = btn.closest('form');
                form.submit();
            })
        })
    } catch (error) {
        return console.log(`Falle en searchForm.js: ${error}`);
    }
})