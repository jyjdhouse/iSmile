window.addEventListener('load', () => {
    // Logica para capturar el click en una transferencia
    const rows = document.querySelectorAll('tbody tr');
    const orderDetailPopup = document.querySelector('.order-detail-popup');
    const blackScreen = document.querySelector('.black-screen');
    const closeOrderDetailBtn = document.querySelector('.close-order-detail-popup');
    rows.forEach(order => {
        order.addEventListener('click', () => {
            // Abro el popup
            orderDetailPopup.classList.add('order-detail-popup-active');
            blackScreen.classList.add('black-screen-active');
        })
    });
    // Para cerrar
    blackScreen.addEventListener('click', () => {
        // cierro el popup
        orderDetailPopup.classList.remove('order-detail-popup-active');
        blackScreen.classList.remove('black-screen-active');
    });
    closeOrderDetailBtn.addEventListener('click', () => {
        // cierro el popup
        orderDetailPopup.classList.remove('order-detail-popup-active');
        blackScreen.classList.remove('black-screen-active');
    });

    // Logica para copiar los valores
    const copyValues = document.querySelectorAll('.copy-value');
    const copyMsg = document.querySelector('.copy-msg')
    copyValues.forEach(value => {
        let valueToCopy = value.innerHTML;
        value.addEventListener('click', () => {
            navigator.clipboard.writeText(valueToCopy);
            copyMsg.classList.add('copy-msg-active');
            setTimeout(() => {
                copyMsg.classList.remove('copy-msg-active');
            }, 1000);
        });
    });

    // Logica por si cambia le valor del select se activa el boton
    const selectStatus = document.querySelector('.status-select');
    const saveChangesBtn = document.querySelector('.save-changes-btn');
    selectStatus.addEventListener('change',()=>{
        saveChangesBtn.classList.remove('hidden');
    })
})