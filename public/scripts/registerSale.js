window.addEventListener('load', () => {

    const addedItemsSection = document.querySelector('.added-items-container')
    let form = document.querySelector('.register-sale-form')
    let removeItemElements = [];

    // LOGICA PARA MOSTRAR LABELS
    const listenCheckboxLabels = () => {
        let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
        checkboxLabels.forEach(lab => {
            lab.addEventListener('click', () => {
                let id = lab.dataset.id;
                let price = lab.dataset.price;

                let itemContainer = document.createElement('div');
                itemContainer.setAttribute('class', 'item-container');
                itemContainer.setAttribute('data-product_id', id);

                addedItemsSection.appendChild(itemContainer);

                let removeElementContainer = document.createElement('div');
                removeElementContainer.setAttribute('class', 'remove-element-container');
                removeElementContainer.innerHTML = "<i class='bx bx-minus remove-element'></i>";
                
                itemContainer.appendChild(removeElementContainer);
                
                removeItemElements = document.querySelectorAll('.remove-element')
                listenToRemoveElements(removeItemElements)

                let productIdInput = document.createElement('input');
                productIdInput.name = 'products_id[]';
                productIdInput.setAttribute('hidden', true);
                productIdInput.setAttribute('class', 'product-id');
                productIdInput.value = id;
                
                
                itemContainer.appendChild(productIdInput)

                let itemName = document.createElement('p');
                itemName.innerText = lab.innerText;
                itemName.setAttribute('class', 'item-name');
                itemName.setAttribute('data-product_id', id);
                
                itemContainer.appendChild(itemName);
                
                let priceLabel = document.createElement('label');
                priceLabel.setAttribute('for', 'item_price');
                priceLabel.innerText = 'Precio';

                itemContainer.appendChild(priceLabel)
;
                let itemPrice = document.createElement('input');
                itemPrice.value = price != 0 ? price : 0 ;
             /*    itemPrice.addEventListener('change', (e) => {
                    itemPrice.value = e.target.value
                }); */
                itemPrice.setAttribute('class', 'item-price');
                itemPrice.setAttribute('data-product_id', id);
                itemPrice.name = 'item_price[]';

                itemContainer.appendChild(itemPrice);

                let quantityLabel = document.createElement('label');
                quantityLabel.setAttribute('for', 'item_quantity');
                quantityLabel.innerText = 'Cantidad';

                itemContainer.appendChild(quantityLabel);

                let itemQuantity = document.createElement('input');
                itemQuantity.value = 1;
                itemQuantity.addEventListener('change', (e) => {
                    itemQuantity.value = e.target.value
                });
                itemQuantity.setAttribute('class', 'item-quantity');
                itemQuantity.setAttribute('data-product_id', id);
                itemQuantity.name = 'item_quantity[]';

                itemContainer.appendChild(itemQuantity);

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
    

    // LÓGICA CUANDO SE HACE EL SUBMIT DEL FORMULARIO
    form.addEventListener('submit', (e) => {

        e.preventDefault()

        let order;
        let date = form.querySelector('input[name="date"]').value;
        let time = form.querySelector('input[name="time"]').value;
        let name = form.querySelector('input[name="name"]').value;
        let last_name = form.querySelector('input[name="last_name"]').value;
        let phone_code = form.querySelector('select[name="phone_code"]').value;
        let email = form.querySelector('input[name="email"]').value;
        let phone = form.querySelector('input[name="phone"]').value;
        let dni = form.querySelector('input[name="dni"]').value;
        let payment_methods_id = form.querySelector('select[name="payment_methods"]').value;
        let billing_street = form.querySelector('input[name="billing_street"]').value;
        let billing_floor = form.querySelector('input[name="billing_floor"]').value;
        let billing_zip_code = form.querySelector('input[name="billing_zip_code"]').value;
        let billing_city = form.querySelector('input[name="billing_city"]').value;
        let billing_province = form.querySelector('select[name="billing_province"]').value;
        

        order = {
            date, 
            time,
            name,
            last_name,
            phone_code,
            phone,
            email,
            dni,
            items: [],
            shipping_addresses_id: null,
            order_types_id: 3,
            use_same_address: false,
            users_id: null,
            use_user_address: false,
            save_user_adress: false,
            payment_methods_id,
            billing_street,
            billing_floor,
            billing_zip_code,
            billing_city,
            billing_province 
        }

        let itemsContainer = document.querySelectorAll('.item-container')
        itemsContainer.forEach(cont => {
            let product = cont.querySelector('.product-id').value
            let quantity = cont.querySelector('.item-quantity').value

            let objectToPush = {
                product_id: product,
                quantity
            }
            order.items.push(objectToPush)
        });

        // POST
        console.log(order);



    })


})