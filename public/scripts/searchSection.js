
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


        /*  LOGICA PARA ENCONTRAR PRODUCTOS  */

        // Obtengo los productos
        // let products = (await ((await fetch(`/api/product`)).json())).products;
        
        // Le hago una copia para poder modificar el array
        products = getDeepCopy(products);
        products.forEach(prod => {
            //Pongo los colores en minuscula
            prod.colors?.forEach(color => {
                color.name = color.name.toLowerCase()
            });
            // Los pongo en un array ['verde','azul',...etc]
            prod.keywords = prod.keywords.map(key => key.name);

            // Dejo solo 1 file por producto
            prod.files.forEach(file => {
                // Agarro la primer foto del primer color
                if (file.file_types_id == 1 && file.colors_id == prod.colors[0].id) {
                    prod.files = file;
                    return
                }
            })
        });

        // Obtengo el input
        let search = document.getElementById('search-products-input');
        // Agarro el section
        let partialSearchSection = document.querySelector('.partial-product-section');

        search.addEventListener('input', () => {
            partialSearchSection.innerHTML = ''
            //     partialSearchContainer.classList.add('partial-search-container-active');
            let text = search.value.toLowerCase();// las keys en la db tan en minuscula
            let textLength = text.length
            let searchWords = text.split(' '); //armo el array con lo que busca
            let searchWordsLength = searchWords.length;
            let partialProductsToDisplay = getDeepCopy(products);
            let productsToPush = [];
            let wordsUsed = [];
            if (textLength) {//Si busca algo...
                // Voy por cada palabra que busca
                searchWords.forEach((word, i) => {
                    // Aca filtro el partial products por cada palabra
                    productsToPush = partialProductsToDisplay.filter((product, index) => {
                        let keywords = product.keywords
                        for (let i = 0; i < keywords.length; i++) {
                            const key = keywords[i];
                            if (key.includes(word)) { //Si encontro por key
                                // Borro esa key del partialProducts array para que no me encuentre mas si busca
                                //  por ej cartera cartera
                                // Me borra esa keyword
                                partialProductsToDisplay[index].keywords.splice([i], 1);
                                // console.log('Tendria que borrar le keyword');
                                // console.log(partialProductsToDisplay[index].keywords);
                                return product
                            };
                        };
                    });
                    if (!productsToPush.length) { //Si no encontro nada con esa convinacion de palabras, devuelvo vacio
                        partialProductsToDisplay = [...productsToPush];
                        return
                    }
                    if (wordsUsed.includes(word)) { //Si busca vestido vestido, tiene que no encontrar nada
                        partialProductsToDisplay = [];
                        return
                    }
                    wordsUsed.push(word);
                    // console.log(partialProductsToDisplay);
                    partialProductsToDisplay = [...productsToPush];
                });
            } else {
                partialProductsToDisplay = [];
            }


            if (partialProductsToDisplay.length) { //Si encontro algun resultado
                partialSearchSection.classList.add('partial-product-section-active');
                const partialProductsLength = partialProductsToDisplay.length;
                const partialProductsDisplayed = partialProductsToDisplay.slice(0, 4);// Lo recorto a 4 productos

                partialProductsDisplayed.forEach(prod => {//RENDERIZA & INYECTA ETIQUETAS LI
                    // console.log(prod);
                    let inyectedHTML =
                        ` 
                    <div class="partial-product-card" data-productid = ${prod.id}>
                        <a href="/test/${prod.id}/${prod.colors[0].id}" class="product-card-link">
                            <div class="partial-product-image-container">
                                <img src="/img/${prod.files.filename}" alt="" class="partial-product-image">
                            </div>
                            <div class="partial-product-info-container">
                                <p class="partial-product-name">${prod.name}</p>
                                <p class="partial-product-price">U$ ${prod.price}</p>
                            </div>
                        </a>    
                    </div>`;
                    partialSearchSection.innerHTML += inyectedHTML;
                });
                partialSearchSection.innerHTML += `<a href="/product/searchResult" class="more-results-msg">Mostrar ${partialProductsLength} productos para "${text}"</a>`;
                // let partialProductAnchors = document.querySelectorAll('.partial-product-name');//Defino grupo de etiquetas <a>
                // partialProductAnchors.forEach(nameTag => {// Itero Los <a>
                //     let nameLength = nameTag.innerText.length;
                //     let name = nameTag.innerText;
                //     nameTag.innerText = '';//Borro el contenido de la etiqueta para no reescribir
                //     let startIndex = name.indexOf(text);
                //     console.log(`StartIndex: ${startIndex}`);
                //     for (let i = 0; i < nameLength; i++) { //recorro letra a letra, a partir que coincida empiezo a pintar
                //         if (i < startIndex || i >= startIndex + textLength) {
                //             nameTag.innerHTML += name[i];
                //         } else if (i >= startIndex && i < startIndex + textLength) {
                //             nameTag.innerHTML += `<span>${name[i]}</span>`;
                //         };
                //     }
                // });
                // Agrego los ids al form
                appendHiddenInputIds(partialProductsToDisplay);
                listenSearchResult();
            } else { //Esto es si no escribio nada en el input (borro su busqueda por ej)
                partialSearchSection.classList.remove('partial-product-section-active');
                partialSearchSection.innerHTML = '';
            }
        });

    } catch (error) {
        return console.log(`Falle en searchForm.js: ${error}`);
    }
})