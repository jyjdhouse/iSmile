import { dateFormater, getTodaysDate, isNumeric } from "./utils.js";
window.addEventListener('load', async () => {
    // In your Javascript (external .js resource or <script> tag)

    const iniciateSelect2 = () => {
        $('.js-example-placeholder-single').select2({
            placeholder: "Selecciónar Tratamiento",
            allowClear: true
        });
    };
    iniciateSelect2();
    // Pido los productos 
    let treatments = (await (await fetch(`${window.location.origin}/api/product/getTreatments`)).json()).treatments;

    // Obtén la fila original que deseas clonar
    var originalRow = document.querySelector('.row') // Obtén la primera fila original
    // Logica para mostrar otra linea de producto
    function getRowToCopy() { //Función que me va a generar la fila que quiero copiar

        // Clona la fila 
        var newRow = originalRow.cloneNode(true);

        // Limpio el input
        newRow.querySelector('.quantity-input').value = 1;

        // Limpio las filas
        const priceNumbers = newRow.querySelectorAll('.price-number');
        priceNumbers.forEach(num => num.innerHTML = '');
        // Obtén el select de la nueva fila
        var selectColumn = newRow.querySelector('.select-column');
        // Destroy Select2
        selectColumn.innerHTML = `<select class="js-example-placeholder-single description" name="treatment"><option></option></select>`;
        let newSelect = selectColumn.querySelector('select');

        // Obetngo los productos pero clonados
        let clonedProducts = JSON.parse(JSON.stringify(treatments)); // Copia independiente de los productos
        clonedProducts.forEach((prod) => {
            let html = `<option value=${prod.id} data.price = ${prod.price} data.cash_price = ${prod.cash_price}>
                            ${prod.name}
                        </option>`
            newSelect.innerHTML += (html)
        })
        return newRow

    };
    const addRowButton = document.querySelector('.add-budget-product-btn');
    const table = document.querySelector('.budget-table>tbody')
    addRowButton.addEventListener('click', () => {
        var rowToAppend = getRowToCopy();
        table.appendChild(rowToAppend);
        iniciateSelect2()
        productPrices();
        listenRemoveRowBtns();
        handleInputsQuantity();
    });

    // Logica para mostrar el valor 1 predeterminado
    const handleAddingQuantity = (e) => { //función que se encarga de manera el click del +
        // Agarro al input mas cerca
        const input = e.target.closest('td').querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
        checkRowPrices();
    }
    const handleSubstractingQuantity = (e) => { //función que se encarga de manera el click del +
        // Agarro al input mas cerca
        const input = e.target.closest('td').querySelector('.quantity-input');
        input.value = input.value > 1 ? parseInt(input.value) - 1 : 1;
        checkRowPrices();
    }

    function handleInputsQuantity() {
        let inputs = document.querySelectorAll('.quantity-input');
        inputs.forEach(input => {
            !input.value ? input.value = 1 : null;
            input.addEventListener('change', (e) => {
                (!e.target.value || e.target.value < 1) ? input.value = 1 : null;
                checkRowPrices();
            });
        });
        // Logica para escuchar los simbolos + - 
        let substractQuantityBtns = document.querySelectorAll('.subtract-quantity-btn');
        let addQuantityBtns = document.querySelectorAll('.add-quantity-btn');
        substractQuantityBtns.forEach(btn => {
            btn.addEventListener('click', handleSubstractingQuantity);
        });
        addQuantityBtns.forEach(btn => {
            btn.addEventListener('click', handleAddingQuantity);
        })
    };
    handleInputsQuantity();

    // Logica para poner precios
    function productPrices() {
        // Obtén una referencia a todos los elementos select utilizando Select2
        const selectElements = $('.description');

        // Itera sobre cada select y agrega el listener para el evento change de Select2
        selectElements.each(function () {
            const selectElement = $(this);

            selectElement.on('change', function () {
                const row = selectElement.closest('.row')[0]; //El 0 es por jQuery
                // Obtiene el elemento <option> selecciónado, con precio y precio en cash
                const selectedOption = selectElement.find('option:selected')[0];

                const price = removeNumberSeparators(selectedOption.attributes['data.price']?.value);
                const cashPrice = removeNumberSeparators(selectedOption.attributes['data.cash_price']?.value);

                // Ahora pinto los precios unitarios
                row.querySelector('.single-price').innerHTML = price || 0;
                row.querySelector('.single-cash-price').innerHTML = cashPrice || 0;
                checkRowPrices();
            });
        });
    };
    productPrices();

    // Logica que va cambiando precios
    function checkRowPrices() {
        let rows = document.querySelectorAll('.row');
        rows.forEach(row => {
            
            let singlePrice = parseInt(removeNumberSeparators(row.querySelector('.single-price').innerHTML));
            let singleCashPrice = parseInt(removeNumberSeparators(row.querySelector('.single-cash-price').innerHTML));
            let quantity = parseInt(row.querySelector('.quantity-input').value);
            let total = row.querySelector('.total');
            let totalCash = row.querySelector('.total-cash');
            total.innerHTML = quantity * singlePrice;
            if (discountInput.value > 0) { //Si hay descuento
                //Para el total: quantity * singlePrice * descuento
                totalCash.innerHTML = quantity * singlePrice * (1 - discountInput.value / 100);
                // Para el single: singlePrice * descuento
                row.querySelector('.single-cash-price').innerHTML = singlePrice * (1 - discountInput.value / 100);
            } else {
                // Tengo que volver a buscar el precio en efectivo para pintarlo
                let select = row.querySelector('.description');
                const selectedOption = select.selectedOptions[0];
                const cashPrice = parseInt(removeNumberSeparators(selectedOption.attributes['data.cash_price']?.value));
                console.log(cashPrice);
                row.querySelector('.single-cash-price').innerHTML = cashPrice || 0;
                singleCashPrice = row.querySelector('.single-cash-price').innerHTML;
                totalCash.innerHTML = quantity * singleCashPrice;
            }
        });
        getTotalPrice();
    }

    // Logica para escuchar cuando tocan la x de una fila
    function listenRemoveRowBtns() {
        let removeRowBtns = document.querySelectorAll('.remove-row-btn');
        removeRowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('.row');
                row.remove();
                getTotalPrice();
                listenRemoveRowBtns();
            })
        });
    };
    listenRemoveRowBtns();

    // Logica para tener el total de $
    function getTotalPrice() {
        const totals = document.querySelectorAll('.total');
        const cashTotals = document.querySelectorAll('.total-cash');
        let totalAmount = 0
        let cashTotalamount = 0;
        let discount = discountInput.value;
        let cashTotalElement = document.querySelector('.total-cash-budget');
        let totalElement = document.querySelector('.total-budget')
        // Hago la suma del total
        totals.forEach(total => {
            totalAmount += parseInt(removeNumberSeparators(total.innerHTML)) || 0;
        });
        totalElement.innerHTML = totalAmount;

        if (discount > 0) {//Si tiene descuento
            cashTotalElement.innerHTML = totalAmount * (1 - discount / 100); //Aplico el descuento
        } else {
            cashTotals.forEach(cashTotal => {
                cashTotalamount += parseInt(removeNumberSeparators(cashTotal.innerHTML)) || 0;
            });
            cashTotalElement.innerHTML = cashTotalamount;
        }
        formatPriceNumber();
        return
    };

    // Logica para mostrar todos los numeros con punto
    function formatPriceNumber() {
        let priceNumbers = document.querySelectorAll('.price-number');
        priceNumbers.forEach(num => num.innerHTML = parseInt(removeNumberSeparators(num.innerHTML)).toLocaleString('es'));
        return
    };
    function removeNumberSeparators(number) { //ME los devuelve al formato 60000 para poder sumar
        return number.replace(/\./g, '');
    };

    // Logica para que todos los inputs numericos no acepten letras
    const applyDiscount = (num) => { //Aplica el descuento, saca las columnas de pago en efectivo
        const cashColumns = document.querySelectorAll('.cash-column');
        const budgetTypes = document.querySelectorAll('.budget-type');
        // Si el valor es 0, muestro devuelta como estaba antes
        if (num == 0) {
            // cashColumns.forEach(col => col.classList.remove('hidden'));
            budgetTypes.forEach(span => span.innerHTML = `Efectivo`);
            checkRowPrices();
            return
        }
        // // Sino oculto las columnas y pongo con descuento
        // cashColumns.forEach(col => col.classList.add('hidden'));
        budgetTypes.forEach(span => span.innerHTML = `Descuento`);
        checkRowPrices();
        return
    }
    let numericInputs = document.querySelectorAll('.numeric-only-input');
    const discountInput = document.querySelector('.discount-input');
    // Logica para que apenas cargue mostrar descuento en 0
    discountInput.value = 0;
    // Logica que para al tocar el input aparezca selecciónado
    discountInput.addEventListener('focus', () => {
        discountInput.select();
    })
    numericInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isNumeric(inputValue)) { // Si no es un número, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
                if (input.classList.contains('discount-input')) {//Agarro al discount y le pregunto por el valor
                    applyDiscount(inputValue);
                    getTotalPrice();
                }
            }
        });
    });


    // Muestro como fecha predeterminada  la del dia
    const inputDate = document.querySelector('#date');
    // Formar la fecha en formato YYYY-MM-DD
    const formattedDate = getTodaysDate();
    // Establecer el valor predeterminado en el input date
    inputDate.value = formattedDate;

    // Escucho el "Generar PDF"
    let PDFGeneratorButton = document.querySelector('.generate-pdf-btn');
    PDFGeneratorButton.addEventListener('click', async () => {
        // Logica para clonar repo
        let bodyClone = document.body.cloneNode(true);
        // Remuevo lo innecesario

        bodyClone.removeChild(bodyClone.querySelector('.spinner-overlay'));
        bodyClone.querySelectorAll('.remove-element').forEach(element => element.remove());
        // Cambio el nombre por un <p>
        // Creo la etiqueta p  <p class="bold"></p> con el valor del input
        let elementsToChange = bodyClone.querySelectorAll('.change-element');
        elementsToChange.forEach(el => {
            let type = el.type;
            let value = el.value;
            const paragraph = document.createElement('p');
            paragraph.classList.add('inyected-p', 'bold');
            paragraph.textContent = type == 'date' ? dateFormater(value) : value;
            el.parentNode.replaceChild(paragraph, el);
        });
        // Ahora modifico los selects
        let productSelects = bodyClone.querySelectorAll('.description');
        productSelects.forEach(select => {
            let selectColumn = select.closest('.select-column');
            let selectedOption = select.closest('.select-column').querySelector('.select2-selection__rendered').innerHTML;
            const paragraph = document.createElement('p');
            paragraph.classList.add('inyected-p');
            paragraph.textContent = selectedOption;
            selectColumn.innerHTML = '';
            selectColumn.appendChild(paragraph);
        });

        // Meto el disclaimer msg
        const disclaimerDiv = document.createElement('div');
        // si tiene descuento...
        if (discountInput.value > 0) { //Agrego esto y borro las columnas cash
            disclaimerDiv.innerHTML =
                `<p class="disclaimer-p">${discountInput.value}% de descuento aplicado</p>   `;
        }
        disclaimerDiv.innerHTML +=
            `
                    
                    <p class="disclaimer-p">Presupuesto Valido por 7 días</p>
                    <p class="disclaimer-p">Los precios son con tarjeta de débito, transferencia y tarjeta de crédito hasta 3 cuotas</p>
                    <p class="disclaimer-final-msg">Agradecemos su confianza, Atentamente</p>
                    <div class="disclaimer-details-container">
                        <p class="disclaimer-detail">4824-5430</p>
                        <p class="disclaimer-detail">info@ismile.com.ar</p>
                        <p class="disclaimer-detail">Av.Santa Fe 2911 3 "D"<br>Palermo, Bs.As.</p>
                    </div>
        `
        bodyClone.querySelector('.main').appendChild(disclaimerDiv);

        // return console.log(bodyClone);
        // Le saco el bold a los inputQuantity
        let inputsQuantityContainers = bodyClone.querySelectorAll('.relative-container');
        inputsQuantityContainers.forEach(cont => {
            cont.querySelector('.inyected-p').classList.remove('bold')
        });

        // Muestro el cargando pdf...
        document.querySelector('.spinner-overlay').classList.remove('hidden');
        // Hago el fetch
        let response = await fetch('/generateBudgetPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify({
                html: bodyClone.innerHTML
            })
        });
        if (response.ok) {
            document.querySelector('.spinner-overlay').classList.add('hidden');
            // Convierte la respuesta en un Blob (archivo)
            const archivoBlob = await response.blob();
            // Crea un enlace de descarga
            const linkToDownload = document.createElement('a');
            linkToDownload.href = URL.createObjectURL(archivoBlob);
            linkToDownload.download = 'presupuesto.pdf';

            // Simula un clic en el enlace para iniciar la descarga
            linkToDownload.click();

            // Limpia los recursos del enlace
            URL.revokeObjectURL(linkToDownload.href);

        };
        // document.body.parentNode.replaceChild(bodyClone, document.body);
    });
})