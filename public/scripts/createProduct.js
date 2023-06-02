import { activateClass, deactivateClass, addFilesToFormData, adaptProductsToBeListed, getDeepCopy } from "./utils.js";

window.addEventListener('load', async () => {
    try {
        // Armo los productos para pintar los "Completar outfit"
        let products = (await (await fetch('/api/product')).json()).products;
        products = adaptProductsToBeListed(products);
        products.forEach(product => { //Dejo a cada color con 1 foto
            product.colors.forEach(color => {
                color.files = color.files[0];
            });
        });
        const getEditedProduct = () => {
            // Obtén la URL actual
            var url = window.location.href;

            // Separa la ruta utilizando el carácter '/'
            var parts = url.split('/');

            // El número se encuentra en la última parte de la ruta
            var productToSearchId = parts[parts.length - 1];
            return products.find(prod => prod.id == productToSearchId)
        }
        let product = getEditedProduct();
        console.log(product);


        // LOGICA PARA IR MOSTRANDO LAS FOTOS QUE SELECCIONA EL ADMIN
        const listenFileInputs = () => { //Lo hago funcion porque va cambiando
            // Capturo todos los input
            const fileInputs = document.querySelectorAll('.input-file');
            //Capturo los contenedores de cada input
            const inputFileContainers = Array.from(document.querySelectorAll('.file-field-container'));

            fileInputs.forEach(input => {

                //Primero le saco el que ya tenia, para que no se acumulen
                input.removeEventListener('change', handleChangeInputFile);

                input.addEventListener('change', handleChangeInputFile);
            });
        }
        const handleChangeInputFile = (e) => { //Tengo que hacerlo funcion para poder removerlo
            const files = e.target.files;
            // ORDENO los files [f1,video,f2,f3...]
            // Separa los archivos en dos arrays: fotos y video
            const fotos = [];
            const video = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/') || file.name.endsWith('.jpg') || file.name.endsWith('.png')) {
                    fotos.push(file);
                } else if (file.type.startsWith('video/') || file.name.endsWith('.mp4')) {
                    video.push(file);
                }
            }
            // Inserta el array de video en la segunda posición del array de archivos
            let sortedFiles = [...fotos];
            sortedFiles.splice(1, 0, ...video);
            console.log(sortedFiles);


            // Primero agarro el contenedor padre del input, para poder targetear el side-images
            const container = e.target.closest('.file-field-container');
            // Agarro el side-images-container relacionado a ese contenedor
            let sideImagesContainer = container.querySelector('.side-images-container');
            sideImagesContainer.innerHTML = ''
            // Crea una promesa para cada archivo y espera a que todas se resuelvan antes de continuar
            // Hay que hacerlo asi porque los videos cargan despues muchas veces
            const filePromises = sortedFiles.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () { //Para leer la imagen
                        let fileType = file.type.split('/')[0];
                        let mediaTag = '';
                        if (fileType === 'image') {
                            mediaTag = `<img src=${reader.result} alt="product-detail-image" class="product-image side-image">`;
                        } else if (fileType === 'video') {
                            mediaTag = `<video src=${reader.result} class="product-image side-image">`;
                        }
                        resolve(mediaTag);
                    };
                });
            });

            Promise.all(filePromises).then((mediaTags) => {
                // Agrega los elementos de imagen y video al contenedor
                mediaTags.forEach((mediaTag, i) => {
                    sideImagesContainer.innerHTML += `
        <div class="side-image-container" data-file="${i}">
          ${mediaTag}
        </div>
      `;
                });
            });
        }

        // LOGICA PARA AGREGAR COLOR A DB
        let sizes = ['XS', 'S', 'M', 'L', 'XL'];
        const createColorFetch = async () => {
            const colorCheckboxSection = document.querySelector('.color-checkbox-section');
            // Agarro el valor del color y el nombre
            const colorHEX = document.querySelector('.input-color').value;
            let colorName = document.querySelector('.creating-color-name').value;
            //Lo formateo para que arranque primer letra mayuscula
            colorName = colorName.toLowerCase();
            colorName = colorName.charAt(0).toUpperCase() + colorName.slice(1);

            if (colorHEX && colorName) { //Si completo ambos valores
                const colorToCreate = { //Para mandar a db
                    name: colorName,
                    code: colorHEX.toUpperCase()
                }
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(colorToCreate),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                };
                //Antes de enviar por fetch, creo el cargando...
                colorCheckboxSection.innerHTML +=
                    `
            <div class="checkbox-container color-checkbox-container" id="loading-color">
            <p>Cargando color...</p>
            </div>
            `;
                // Enviar la solicitud HTTP utilizando la API Fetch
                let newColor = (await (await fetch('/api/product/createColor', requestOptions)).json()).color;
                //Una vez cargo el color, saco el cargando...
                const loadingColor = document.getElementById('loading-color');
                colorCheckboxSection.removeChild(loadingColor)
                colorCheckboxSection.innerHTML +=
                    `
            <div class="checkbox-container color-checkbox-container">
            <input type="checkbox" name="colors" class="input-colors-checkbox" value=${newColor.id} id=${newColor.id} data-colorname="${newColor.name}">
            <label class="color-name-label" for=${newColor.id}><span class="color-circle" style="background-color: ${newColor.code};"></span> 
            ${newColor.name}</label>
            </div>
            `;
                return listenCheckboxsColors();
            }
        }
        const listenInputColor = () => { //Escucha el cambio del input color
            const inputColor = document.querySelector('.input-color');
            inputColor.addEventListener('input', (e) => {
                colorCodeText.innerHTML = `${e.target.value}`

            });

            //Aqui invoco a la escucha del boton para agregar
            listenCreateBtn();
        };
        const listenCreateBtn = async () => { //Escucha al boton para agregar producto
            try {
                // Boton para confirmar creacion
                const createColorBtn = document.querySelector('.creating-color-btn');
                const inputColor = document.querySelector('.input-color');
                createColorBtn.addEventListener('click', async () => { //Si le da al crear
                    await createColorFetch()
                });
                inputColor.addEventListener("keydown", async function (event) {//Si mete enter en vez del +
                    event.stopPropagation();
                    if (event.keyCode === 13) {//Si le da a enter
                        event.preventDefault();
                        await createColorFetch()
                    }
                });
            } catch (error) {
                return console.log(`Falle en listenCreateBtn: ${error}`);
            }
        }

        const blackScreen = 'black-screen';
        const addColorBtn = document.querySelector('.add-color-container');
        const closeCreatingColorBtn = document.querySelector('.close-creating-color-btn');
        const creatingColorContainer = 'creating-color-container';
        let colorCodeText = document.querySelector('.color-code-text');
        let firstTimeLoaded = true;

        addColorBtn.addEventListener('click', () => {//Si tocan el "Agregar +"
            activateClass([creatingColorContainer]);
            listenInputColor();
        });
        closeCreatingColorBtn.addEventListener('click', () => {
            deactivateClass([creatingColorContainer]);
        });


        // LOGICA PARA AGREGAR/BORRAR LOS INPUT FILE 


        const appendFileHTML = (e) => { //Tengo que hacer esta funcion porque sino los input file se borra el contenido
            // Creo los nuevos elementos HTML
            // Contenedor DIV
            const newContainer = document.createElement('div');
            newContainer.classList.add('file-field-container');
            newContainer.setAttribute('data-id', e.id);
            newContainer.setAttribute('data-colorname', e.dataset.colorname);
            //Label
            const label = document.createElement('label');
            label.textContent = `Color ${e.dataset.colorname} - STOCK - Fotos/Video`;
            // STOCK
            // Contenedor padre
            const stockDivContainer = document.createElement('div');
            stockDivContainer.classList.add('stock-container');
            // Voy por cada talle y le agrego al div Contenedor el label e input
            sizes.forEach((size, i) => {
                const sizeContainer = document.createElement('div');
                sizeContainer.classList.add('size-container');
                sizeContainer.setAttribute('data-sizeid', i + 1);
                const sizeLabel = document.createElement('label');
                sizeLabel.classList.add('size-label');
                sizeLabel.textContent = size;
                const sizeInput = document.createElement('input');
                sizeInput.setAttribute('type', 'number');
                sizeInput.setAttribute('class', 'size-input');
                sizeInput.setAttribute('name', 'size-stock');
                if (product) { //Si hay producto es editProduct, entonces le cargo el value
                    let stockValue = product.stocks.find(stock => stock.sizes_id == i + 1 && stock.colors_id == e.id)?.quantity;
                    sizeInput.setAttribute('value', stockValue);
                }
                sizeContainer.appendChild(sizeLabel);
                sizeContainer.appendChild(sizeInput);
                stockDivContainer.appendChild(sizeContainer);
            });

            // Input
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('multiple', '');
            input.setAttribute('class', 'input-file');
            input.setAttribute('data-colorid', e.id);
            // Side-image-container
            const sideImagesContainer = document.createElement('div');
            sideImagesContainer.classList.add('side-images-container');
            // Complete Outfit Button
            const completeOutfitButton = document.createElement('button');
            completeOutfitButton.type = 'button';
            completeOutfitButton.classList.add('complete-outfit-open-btn');
            completeOutfitButton.textContent = 'Completar Outfit';
            // Side-outfitImages-container
            const sideOutfitImagesContainer = document.createElement('div');
            sideOutfitImagesContainer.classList.add('side-outfit-images-container');
            // Armo el div-contenedor
            newContainer.appendChild(label);
            newContainer.appendChild(stockDivContainer)
            newContainer.appendChild(input);
            newContainer.appendChild(sideImagesContainer);
            newContainer.appendChild(completeOutfitButton);
            newContainer.appendChild(sideOutfitImagesContainer);
            // Agrego el nuevo elemento HTML al final del contenedor principal
            const productImagesUploadContainer = document.querySelector('.product-images-upload-container');
            productImagesUploadContainer.appendChild(newContainer);
            paintCompleteOutfitOptions(newContainer, e.dataset.colorname)
        };

        const insertInputFile = (e) => {//Agrega el input file 
            // Agarro el contenedor de la seccion
            const productImagesUploadContainer = document.querySelector('.product-images-upload-container');
            // Agarro los contenedores de los input
            const inputFileContainers = document.querySelectorAll('.file-field-container');
            //Si no hay, entonces se que limpio el contenedor padre
            if (!inputFileContainers.length) {
                productImagesUploadContainer.innerHTML = '';
            }
            appendFileHTML(e);//Suplanta al innerHTML
            listenCompleteOutfitBtns(); //Escucha los botones que le agregue
        };

        const removeInputFile = (e) => {//Borra el input file 
            // Agarro el contenedor de la seccion
            const productImagesUploadContainer = document.querySelector('.product-images-upload-container');
            // Agarro los contenedores de los input
            const inputFileContainers = Array.from(document.querySelectorAll('.file-field-container'));
            if (inputFileContainers.length <= 1) {//Si solo hay un color, lo unico que hago es repintar el contenedor gde
                productImagesUploadContainer.innerHTML = `<p class="no-colors-selected-text">MULTIMEDIA (selecciona algun color para cargar fotos/videos)</p>`;
                return
            }
            // Encuentro el contenedor del input y lo borro
            const fieldToRemove = inputFileContainers.find(input => input.dataset.id == e.target.id);
            productImagesUploadContainer.removeChild(fieldToRemove);
            return
        }

        // LOGICA DE OUTFIT
        const listenCheckboxsColors = () => {
            const colorsCheckbox = document.querySelectorAll('.color-checkbox-container');

            colorsCheckbox.forEach(checkbox => {
                if (firstTimeLoaded) { //Si es cuando cargo la pagina
                    const input = checkbox.querySelector('.input-colors-checkbox')
                    if (input.checked) { //Si ya viene chequiado
                        insertInputFile(input);
                        listenFileInputs();
                    };

                }

                checkbox.addEventListener('change', (e) => { //Capto cuando esta marcado/desmarcado
                    if (e.target.checked) { //Si marco al color
                        insertInputFile(e.target);
                        listenFileInputs();
                    } else {//Si se desmarca
                        removeInputFile(e);
                        listenFileInputs();
                    }

                });
            });
            firstTimeLoaded = false;
        }
        const listenCompleteOutfitBtns = () => {
            const completeOutfitOpenBtns = document.querySelectorAll('.complete-outfit-open-btn');
            const completeOutfitContainer = 'complete-outfit-container';
            let completeOutfitCloseBtns = document.querySelectorAll('.close-complete-outfit-container');
            completeOutfitOpenBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const container = btn.closest('.file-field-container')
                    e.stopPropagation();
                    const colorName = container.dataset.colorname;
                    const colorId = container.dataset.id;
                    container.querySelector(`.${completeOutfitContainer}`).classList.add(`${completeOutfitContainer}-active`);
                    activateClass([blackScreen]);
                    listenCompleteOutfitOptions(container);
                });
            });
            completeOutfitCloseBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const container = btn.closest('.file-field-container');
                    container.querySelector(`.${completeOutfitContainer}`).classList.remove(`${completeOutfitContainer}-active`);
                    deactivateClass([blackScreen]);
                })
            });
            document.querySelector(`.${blackScreen}`).addEventListener('click', () => {
                const containers = document.querySelectorAll(`.${completeOutfitContainer}`);
                containers.forEach(cont => cont.classList.remove(`${completeOutfitContainer}-active`))
                deactivateClass([blackScreen]);
            })
        };

        var outfitProducts = {};//Objeto donde va a estar combinacion prod-color
        const checkIfHasOutfitProducts = async () => {//Funcion que se fija si es pantalla de edit y busca outfitProducts
            if (window.location.pathname.includes('editProduct')) { // La ruta contiene 'editProduct'
                // Agarro el id del producto para hacer apiFetch
                const pathArray = window.location.pathname.split('/');
                const prodId = pathArray[pathArray.length - 1];
                // Enviar la solicitud HTTP utilizando la API Fetch
                let product = (await (await fetch(`/api/product/${prodId}`)).json()).product;

                // Entro a la propiedad esta, que es un objeto igual al outfitProducts (linea 293)
                if (product.outfitProductsObject) {
                    for (const colorId in product.outfitProductsObject) {
                        outfitProducts[colorId] = product.outfitProductsObject[colorId];
                    }
                };
            };
            return
        };
        await checkIfHasOutfitProducts();
        const listenCompleteOutfitOptions = (container) => { //LOGICA PARA SELECCIONAR PRODUCTOS PARA QUE VAYAN CON EL OUTFIT
            const cards = container.querySelectorAll('.complete-outfit-card');
            const cardProtector = 'card-active-protector';
            // Color del producto para parearle el outfit 
            const containerColorId = container.dataset.id;

            // Si ya hay outfits con este color, agarro ese array, sino creo uno para despues pushearlo
            let arrayToPush = outfitProducts[containerColorId] && getDeepCopy(outfitProducts[containerColorId]) || [];
            // Ahora voy por cada card para ver si la quiere seleccionar o desmarcar
            cards.forEach(card => {
                // Propiedades del producto de la card
                const prodId = card.dataset.productid;
                const colorId = card.dataset.colorid;
                //Si existe algun outfit ya marcado con ese color
                if (outfitProducts[containerColorId]) {
                    // Entro a ese array y le pregunto por la card
                    outfitProducts[containerColorId].forEach(combination => {
                        if (combination.prodId == prodId && combination.colorId == colorId) {
                            card.querySelector(`.${cardProtector}`).classList.add(`${cardProtector}-active`);
                        };
                    });
                };

                // Si hacen click en una card...
                card.addEventListener('click', () => {
                    // Me fijo si ya estaba chequeado, para pushear o remover item de array
                    const index = arrayToPush.findIndex(prod => prod.prodId == prodId && prod.colorId == colorId);
                    if (index != -1) { //Si ya estaba la card (va a dar un numero)
                        arrayToPush.splice(index, 1);
                        card.querySelector(`.${cardProtector}`).classList.remove(`${cardProtector}-active`);
                    } else {//sino.. (va a dar -1)
                        if (arrayToPush.length < 3) {
                            arrayToPush.push({
                                prodId,
                                colorId
                            });
                            // console.log(arrayToPush);
                            card.querySelector(`.${cardProtector}`).classList.add(`${cardProtector}-active`);
                        }
                    };
                    displayOutfitImages();
                });
            });
            outfitProducts[containerColorId] = arrayToPush;
        };
        const paintCompleteOutfitOptions = (container, colorName) => {

            // Creo el div y lo agrego de la manera append
            const divToAppend = document.createElement('div');
            divToAppend.classList.add('complete-outfit-container');
            container.appendChild(divToAppend);

            // CODIGO que se inyecta antes de los productos
            let HTML =
                `
                <p class="complete-outfit-color-label">COLOR ${colorName.toUpperCase()}</p>
                <i class="fa-regular fa-x close-complete-outfit-container"></i>
                <div class="complete-outfit-top-row-container">
                    <h4 class="complete-outfit-title">Completar Outfit con <span>(selecciona hasta 3)</span></h4>
                    <input type="text" class="complete-outfit-search-input" placeholder="Buscar por nombre...">
                </div>
                <div class="complete-outfit-cards-container">
                </div>
            `;
            // Capturo el contenedor de productos e itero y voy pintando
            container.querySelector('.complete-outfit-container').innerHTML = HTML;
            let containerToInyectProducts = container.querySelector('.complete-outfit-cards-container');
            products.forEach(product => {
                product.colors.forEach(prodColor => {
                    containerToInyectProducts.innerHTML +=
                        `<div class="complete-outfit-card" data-productid = ${product.id}  data-colorid = ${prodColor.id}>
                        <div class="complete-outfit-card-image-container">
                            <img src="/img/${prodColor.files.filename}" alt="card-image" class="complete-outfit-card-image">
                        </div>
                        <p class="complete-outfit-card-name">${product.name}</p>
                                                
                        <div class="card-active-protector">
                            <i class="fa-regular fa-circle-check checked-card checked-card"></i>
                        </div>
                    </div>`
                });
            });

        }

        listenCheckboxsColors();

        // para ir mostrando lo que elijen del outfit
        // LOGICA PARA IR MOSTRANDO LAS FOTOS QUE SELECCIONA EL ADMIN
        const displayOutfitImages = () => { //Lo hago funcion porque va cambiando
            // Voy por cada clave del objeto Outfit (son los colores)
            for (const colorId in outfitProducts) {
                if (Object.hasOwnProperty.call(outfitProducts, colorId)) {
                    // Agarro al contenedor de ese color
                    const container = Array.from(document.querySelectorAll('.file-field-container')).find(cont => cont.dataset.id == colorId);
                    const sideOutfitImages = container.querySelector('.side-outfit-images-container');
                    sideOutfitImages.innerHTML = '';
                    const outfitObjects = outfitProducts[colorId];//Array
                    outfitObjects.forEach(prod => {
                        console.log(prod);
                        let productToDisplay = products.find(p => p.id == prod.prodId);
                        // Agarro el file
                        let file = productToDisplay.colors.find(col => col.id == prod.colorId).files
                        let fileUrl = `/img/${file.filename}`
                        let mediaTag = `<img src=${fileUrl} alt="product-detail-image" class="product-image side-outfit-image">`;
                        sideOutfitImages.innerHTML += mediaTag
                    });


                }
            }
        }
        displayOutfitImages();

        // LOGICA PARA AGREGAR KEYWORDS
        const printActiveKeywords = () => {
            // Para poner la cantidad de keywords en ();
            let keywordsNumber = document.querySelector('.keywords-quantity');
            activeKeywords.length ? keywordsNumber.innerHTML = `(${activeKeywords.length})` :
                keywordsNumber.innerHTML = ''
            keywordCardsContainer.innerHTML = '';
            activeKeywords.forEach((key, i) => {
                keywordCardsContainer.innerHTML +=
                    `
            <div class="keyword-card" data-keyid = ${i}>
                <p class="keyword-name">${key}</p>
                <i class='bx bx-minus remove-keyword-btn' data-keyid = ${i}></i>
            </div>
            `
            });
            listenRemoveKeywordsBtns();
        };
        const listenRemoveKeywordsBtns = () => {
            const removeKeywordBtns = document.querySelectorAll('.remove-keyword-btn');
            // Para sacar
            removeKeywordBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.keyid;
                    activeKeywords.splice(id, 1);
                    printActiveKeywords();
                });
            });
        }
        const addKeywordBtn = document.querySelector('.add-keyword-btn');
        const addKeywordInput = document.querySelector('.add-keyword-input');

        let keywordCardsContainer = document.querySelector('.keyword-cards-container');
        let activeKeywords = []; //Las keywords que agregaron al producto
        // Para agregar
        addKeywordBtn.addEventListener('click', () => {//Si toca el +
            let keywordInput = document.querySelector('.add-keyword-input');
            if (keywordInput.value) { //Si Escribio algo...
                activeKeywords.push(keywordInput.value);
                printActiveKeywords();
                keywordInput.value = '';
            }
        });
        addKeywordInput.addEventListener("keypress", function (event) {//Si mete enter en vez del +
            if (event.keyCode === 13) {//Si le da a enter
                let keywordInput = document.querySelector('.add-keyword-input');
                if (keywordInput.value) { //Si Escribio algo...
                    activeKeywords.push(keywordInput.value);
                    printActiveKeywords();
                    keywordInput.value = '';
                }
            }
        });
        // Apenas arranca tengo que preguntar si ya vienen keywords (por si es update)
        const renderedActiveKeywords = document.querySelectorAll('.keyword-name');
        renderedActiveKeywords.forEach((key, i) => {
            activeKeywords.push(key.innerHTML);
            printActiveKeywords();
        });


        // LOGICA PARA AGREGAR DETALLES
        const printActiveDetails = () => {
            // Para poner la cantidad de details en ();
            let detailsNumber = document.querySelector('.details-quantity');
            activeDetails.length ? detailsNumber.innerHTML = `(${activeDetails.length})` :
                detailsNumber.innerHTML = ''
            detailCardsContainer.innerHTML = '';
            activeDetails.forEach((detail, i) => {
                detailCardsContainer.innerHTML +=
                    `
            <div class="detail-card" data-detailid = ${i}>
                <p class="detail-name">${detail}</p>
                <i class='bx bx-minus remove-detail-btn' data-detailid = ${i}></i>
            </div>
            `
            });
            listenRemoveDetailsBtns();
        };
        const listenRemoveDetailsBtns = () => {
            const removeDetailBtns = document.querySelectorAll('.remove-detail-btn');
            // Para sacar
            removeDetailBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.detailid;
                    activeDetails.splice(id, 1);
                    printActiveDetails();
                });
            });
        }
        const addDetailBtn = document.querySelector('.add-detail-btn');
        const addDetailInput = document.querySelector('.add-detail-input');

        let detailCardsContainer = document.querySelector('.detail-cards-container');
        let activeDetails = []; //Las details que agregaron al producto
        // Para agregar
        addDetailBtn.addEventListener('click', () => {//Si toca el +
            let detailInput = document.querySelector('.add-detail-input');
            if (detailInput.value) { //Si Escribio algo...
                activeDetails.push(detailInput.value);
                printActiveDetails();
                detailInput.value = '';
            }
        });
        addDetailInput.addEventListener("keypress", function (event) {//Si mete enter en vez del +
            if (event.keyCode === 13) {//Si le da a enter
                let detailInput = document.querySelector('.add-detail-input');
                if (detailInput.value) { //Si Escribio algo...
                    activeDetails.push(detailInput.value);
                    printActiveDetails();
                    detailInput.value = '';
                }
            }
        });

        // Apenas arranca tengo que preguntar si ya vienen details (por si es update)
        const renderedActiveDetails = document.querySelectorAll('.detail-name');
        renderedActiveDetails.forEach((detail, i) => {
            activeDetails.push(detail.innerHTML);
            printActiveDetails();
        });


        const getStocksArray = (e) => {
            const sizeStocks = e.target['size-stock'];
            let stockArray = [];
            sizeStocks.forEach(size => {
                // Agarro el colorID
                const colorId = size.closest('.file-field-container').dataset.id;
                // Agarro el sizeId
                const sizeId = size.closest('.size-container').dataset.sizeid;
                // Agarro la cantidad
                const quantity = parseInt(size.value);
                stockArray.push({
                    colorId,
                    sizeId,
                    quantity
                })
            });
            return stockArray
        }

        // LOGICA para enviar por POST los datos 

        //CREATEFORM
        const createProductForm = document.querySelector('#create-product-form');

        createProductForm?.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Agarro todo el stock que pusieron
            let stockArray = getStocksArray(e)

            // Meto los colores que chequeo
            let activeColors = [];
            e.target.colors.forEach(checkbox => checkbox.checked && activeColors.push(checkbox.value));
            const formData = new FormData(); //Es el body, lo hago asi porque tengo los files;
            // Agrego todos los campos
            formData.append('name', e.target.name.value);
            formData.append('price', e.target.price.value);
            formData.append('description', e.target.description.value);
            formData.append('colors', JSON.stringify(activeColors));
            formData.append('categories_id', e.target.categories_id.value);
            formData.append('keywords', JSON.stringify(activeKeywords));
            formData.append('details', JSON.stringify(activeDetails));
            formData.append('outfitProducts', JSON.stringify(outfitProducts));
            formData.append('stocks', JSON.stringify(stockArray))
            // Capturo todos los input-files
            let fileInputs = document.querySelectorAll('.input-file');
            await addFilesToFormData(formData, fileInputs);

            //Armo el fetch
            const requestOptions = {
                method: 'POST',
                body: formData
            };

            // Enviar la solicitud HTTP utilizando la API Fetch
            fetch('/api/product/createProduct', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // return console.log(data);
                    // Redirigir a la página de destino después de enviar la solicitud HTTP
                    window.location.href = `/test/${data.product.id}/${activeColors[0]}`;
                })
                .catch(error => console.log(error));
        });

        //EDITFORM
        const editProductForm = document.querySelector('#edit-product-form');

        editProductForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Capturo el id del numero por la url
            const url = window.location.href; // obtener la URL actual
            const parts = url.split('/'); // dividir la URL en partes usando la barra como separador
            const productId = parts[parts.length - 1]; // obtener el último elemento del array "parts"
            // Meto los colores que chequeo
            let activeColors = [];
            e.target.colors.forEach(checkbox => checkbox.checked && activeColors.push(checkbox.value));
            const formData = new FormData(); //Es el body, lo hago asi porque tengo los files;

            // Agarro todo el stock que pusieron
            let stockArray = getStocksArray(e)

            // Agrego todos los campos
            formData.append('name', e.target.name.value);
            formData.append('price', e.target.price.value);
            formData.append('description', e.target.description.value);
            formData.append('colors', JSON.stringify(activeColors));
            formData.append('categories_id', e.target.categories_id.value);
            formData.append('keywords', JSON.stringify(activeKeywords));
            formData.append('details', JSON.stringify(activeDetails));
            formData.append('outfitProducts', JSON.stringify(outfitProducts));
            formData.append('stocks', JSON.stringify(stockArray))
            // Para que me permita hacer PUT
            formData.append('_method', 'PUT');
            // Capturo todos los input-files
            let fileInputs = document.querySelectorAll('.input-file');
            await addFilesToFormData(formData, fileInputs);

            //Armo el fetch
            const requestOptions = {
                method: 'PUT',
                body: formData
            };

            // Enviar la solicitud HTTP utilizando la API Fetch
            fetch(`/api/product/updateProduct/${productId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // return console.log(data);
                    // Redirigir a la página de destino después de enviar la solicitud HTTP
                    window.location.href = `/test/${data.product.id}/${activeColors[0]}`;
                })
                .catch(error => console.log(error));
        });
    } catch (error) {
        console.error();
        return console.log(`Falle en createProduct.js: ${error}`);
    }
});