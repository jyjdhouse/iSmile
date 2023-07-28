import { getTodaysDate, isLetter, isNumeric } from "./utils.js";

window.addEventListener('load', () => {

    const addedItemsSection = document.querySelector('.added-items-container-single')
    let form = document.querySelector('.register-sale-form')
    let removeItemElements = [];

    // LOGICA PARA DEJAR SOLO NUMEROS/LETRAS
    // Logica para que todos los inputs numericos no acepten letras
    let numericInputs = document.querySelectorAll('.numeric-only-input');
    numericInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isNumeric(inputValue)) { // Si no es un número, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
            }
        });
    });

    // Logica para que todos los input de solo letras no acepten numeros
    let letterInputs = document.querySelectorAll('.letter-only-input');
    letterInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (isLetter(inputValue) || inputValue == '') { // Si no es letra, borra el contenido del campo
                lastInputValue = inputValue; // Almacenar el último valor válido
            } else {
                e.target.value = lastInputValue;
            }
        });
    });
    // LOGICA PARA MOSTRAR LABELS
    const listenCheckboxLabels = () => {
        let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
        checkboxLabels.forEach(lab => {
            lab.addEventListener('click', () => {
                const labelsPainted = Array.from(document.querySelectorAll('.item-container .item-name'));
                let labAlreadyDisplayed = labelsPainted.find(contLabel=>contLabel.innerText == lab.innerText);
                if(labAlreadyDisplayed)return;
                
                let id = lab.dataset.id;
                let price = lab.dataset.price;

                let itemContainer = document.createElement('div');
                itemContainer.setAttribute('class', 'item-container');
                itemContainer.setAttribute('data-product_id', id);

                addedItemsSection.appendChild(itemContainer);

                let removeElementContainer = document.createElement('div');
                removeElementContainer.setAttribute('class', 'remove-element-container');
                removeElementContainer.innerHTML = "<i class='bx bx-x-circle remove-element'></i>";

                itemContainer.appendChild(removeElementContainer);

                removeItemElements = document.querySelectorAll('.remove-element')
                listenToRemoveElements(removeItemElements)

                let productIdInput = document.createElement('input');
                productIdInput.name = 'products_id';
                productIdInput.setAttribute('hidden', true);
                productIdInput.setAttribute('class', 'product-id');
                productIdInput.value = id;


                itemContainer.appendChild(productIdInput)

                let itemName = document.createElement('p');
                itemName.innerText = lab.innerText;
                itemName.setAttribute('class', 'item-name');
                itemName.setAttribute('data-product_id', id);

                itemContainer.appendChild(itemName);


                let itemPrice = document.createElement('input');
                itemPrice.value = price != 0 ? price : 0;
                /*    itemPrice.addEventListener('change', (e) => {
                       itemPrice.value = e.target.value
                   }); */
                itemPrice.setAttribute('class', 'item-price numeric-only-input');
                itemPrice.setAttribute('data-product_id', id);
                itemPrice.name = 'item_price';

                itemContainer.appendChild(itemPrice);

                let itemQuantityDiv = document.createElement('div');
                itemQuantityDiv.setAttribute('class', 'item-quantity-container');

                itemQuantityDiv.innerHTML =
                    `
                <i class='bx bx-minus reduce-item-quantity-btn'></i>
                <input class="item-quantity numeric-only-input" data-product_id="${id}" name="item_quantity">
                <i class='bx bx-plus add-item-quantity-btn'></i>
                `
                let reduceIcon = itemQuantityDiv.querySelector('.reduce-item-quantity-btn');
                let addIcon = itemQuantityDiv.querySelector('.add-item-quantity-btn');
                let itemQuantityInput = itemQuantityDiv.querySelector('.item-quantity');
                itemQuantityInput.value = 1;
                reduceIcon.addEventListener('click',(e)=>{
                    itemQuantityInput.value == 1 ? null : 
                    itemQuantityInput.value--;
                });
                addIcon.addEventListener('click',(e)=>{
                    itemQuantityInput.value++;
                });
                itemQuantityInput.addEventListener('change',(e)=>{
                    itemQuantityInput.value = e.target.value;
                })

                

                itemContainer.appendChild(itemQuantityDiv);

                // Lo agrego al section
                addedItemsSection.appendChild(itemContainer);

            });
        });
    }
    listenCheckboxLabels()

    // LÓGICA PARA BORRAR ITEMS
    const listenToRemoveElements = (elements) => {
        elements.forEach(element => {
            element.addEventListener('click', () => {
                let parent = element.closest('.item-container')
                parent.remove()
            })
        })
    }

    // LOGICA para buscador de tarjetas
    const listenToSearchInput = () => {
        let inputSerach = document.querySelector('.search-checkbox');
        inputSerach.addEventListener('input', (e) => {
            // Agarro las labels 
            let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
            // tomo el valor de busqueda
            let value = e.target.value.toLowerCase();
            // Si el valor esta contenido en el nombre, muestro las etiquetas
            checkboxLabels.forEach(label => {
                if (!label.innerHTML.toLowerCase().includes(value)) {
                    label.classList.add('hidden');
                } else {
                    label.classList.remove('hidden')
                }
            });
        });
    }
    listenToSearchInput();

    // Muestro como fecha predeterminada  la del dia
    const inputDate = document.querySelector('input[name="date"]');
    // Formar la fecha en formato YYYY-MM-DD
    const formattedDate = getTodaysDate();
    // Establecer el valor predeterminado en el input date
    inputDate.value = formattedDate;

    // LÓGICA CUANDO SE HACE EL SUBMIT DEL FORMULARIO
    form.addEventListener('submit', async (e) => {

        try {
            e.preventDefault()
            let order;
            let date = form.querySelector('input[name="date"]')?.value;
            let name = form.querySelector('input[name="name"]')?.value;
            let last_name = form.querySelector('input[name="last_name"]')?.value;
            let phone_code = form.querySelector('select[name="phone_code"]')?.value;
            let email = form.querySelector('input[name="email"]')?.value;
            let phone = form.querySelector('input[name="phone"]')?.value;
            let dni = form.querySelector('input[name="dni"]')?.value;
            let payment_methods_id = form.querySelector('select[name="payment_methods"]')?.value;
            let billing_street = form.querySelector('input[name="billing_street"]')?.value;
            let billing_floor = form.querySelector('input[name="billing_floor"]')?.value;
            let billing_zip_code = form.querySelector('input[name="billing_zip_code"]')?.value;
            let billing_city = form.querySelector('input[name="billing_city"]')?.value;
            let billing_province = form.querySelector('select[name="billing_province"]')?.value;


            order = {
                date,
                name,
                last_name,
                phone_code,
                phone,
                email,
                dni,
                order_types_id: 3,
                use_same_address: false,
                users_id: null,
                use_user_address: false,
                save_user_address: false,
                payment_methods_id,
                billing_street,
                billing_floor,
                billing_zip_code,
                billing_city,
                billing_province
            }
            let items = [];
            let itemsContainer = document.querySelectorAll('.item-container')
            itemsContainer.forEach(cont => {
                let product = cont.querySelector('.product-id')?.value
                let quantity = cont.querySelector('.item-quantity')?.value
                let price = cont.querySelector('.item-price')?.value
                let objectToPush = {
                    products_id: product,
                    quantity,
                    price
                }
                items.push(objectToPush)
            });
            order.items = JSON.stringify(items);

            // Pinto el overlay antes de hacer el post
            const overlay = document.querySelector('.overlay');
            const loadingSpinner = document.querySelector('.overlay .loading-container');
            overlay.classList.remove('hidden');
            loadingSpinner.classList.add('loading-container-active');
            // Hago el fetch
            let fetchResponse = await fetch('/api/user/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
                },
                body: JSON.stringify(order)
            });
            if (!fetchResponse.ok) {
                // Aca quiere decir que respondio mal, pinto rojo el overlay
                loadingSpinner.classList.remove('loading-container-active');
                overlay.classList.add('overlay-incorrect');
                setTimeout(() => {
                    window.location.href = '/admin/registrar-venta'
                }, 2000);
                return console.log(`Error: ${fetchResponse.msg}`);
            };
            // Aca quiere decir que respondio bien, pinto verde el overlay
            loadingSpinner.classList.remove('loading-container-active');
            overlay.classList.add('overlay-correct');
            setTimeout(() => {
                window.location.href = '/admin/ventas'
            }, 2000);
        } catch (error) {
            return console.log(`Error en el procesamiento del formulario: ${error}`)
        }

    })


})