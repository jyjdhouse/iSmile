window.addEventListener('load', () => {

    const footerIconsContainer = document.querySelectorAll('.footer-icon-container')
    const footerDataIconsContainer = document.querySelectorAll('.mobile-footer-data-icon-container')
    const dataXContainer = document.querySelectorAll('.x-container')
    const closeFooterDataBtn = document.querySelectorAll('.close-footer-data')
    const addressBtn = document.querySelector('.open-map');
    const copyAddress = document.querySelector('.address-detail');
    const copyMobileNumberBtn = document.querySelector('.copy-mobile-number');
    const mobileNumberContainer = document.querySelector('.mobile-number-container');
    const copyPhoneNumberBtn = document.querySelector('.copy-phone-number');
    const phoneNumberContainer = document.querySelector('.phone-number-container');
    const callMobileNumber = document.querySelector('.call-mobile-number');
    const callPhoneNumber = document.querySelector('.call-btn');
    const blackScreen = document.querySelector('.black-screen');
    // Para abrir maps
    const mapIcons = document.querySelectorAll('.bx-map');
    mapIcons.forEach(icon => {
        icon.addEventListener('click',()=>{
            window.open('https://goo.gl/maps/UShCan3csFTSceQP9','_blank')
        })
    });

    closeFooterDataBtn?.forEach(btn => {
        btn?.addEventListener('click', () => {
            footerDataIconsContainer.forEach(cont => cont.classList.remove('mobile-footer-data-icon-container-active'));
            blackScreen.classList.remove('black-screen-active');
        })

    });
    blackScreen?.addEventListener('click', () => {
        footerDataIconsContainer.forEach(cont => cont.classList.remove('mobile-footer-data-icon-container-active'));
        blackScreen.classList.remove('black-screen-active');
    });

    //Para llamar cuando toca
    

    // Para copiar al portapapeles
    const address = 'Avenida Santa Fé 2911 3 F, C1425 Buenos Aires'
    copyAddress?.addEventListener('click', () => {
        navigator.clipboard.writeText(address)
        copyAddress.innerHTML = '<p class="copy-msg">Dirección copiada</p>'
        setTimeout(() => {
            copyAddress.innerHTML = `Av. Santa Fé 2911 3ºF<i class='bx bx-copy'></i>`
        }, 2000)
    })

    const mobilePhone = '+541124852020';
    copyMobileNumberBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(mobilePhone)
        mobileNumberContainer.innerHTML = '<p class="copy-msg">Número copiado</p>'
        setTimeout(() => {
            mobileNumberContainer.innerHTML = `Cel: 11 2485 2020<i class='bx bx-copy copy-mobile-number'></i><i class='bx bx-phone call-mobile-number' ></i>`
        }, 2000)
    })

    callMobileNumber?.addEventListener('click', () => {
        window.location.href = `tel:${mobilePhone}`;
    });

    const phone = '+541148245430'
    callPhoneNumber?.addEventListener('click', () => {
        window.location.href = `tel:${phone}`;
    });
 

})