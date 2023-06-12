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
    const callPhoneNumber = document.querySelector('.call-phone-number');
    const blackScreen = document.querySelector('.black-screen');
    // logica para clickear iconos en footer mobile
    footerIconsContainer.forEach((icon, indexIcon) => {
        icon.addEventListener('click', () => {
            // como estan separados los iconos de la data de cada uno
            // pregunto si el index del icon es igual al index de la data
            // y agrego clase
            for (let indexData = 0; indexData < footerDataIconsContainer.length; indexData++) {
                if (indexIcon === indexData) {
                    footerDataIconsContainer[indexData].classList.add('mobile-footer-data-icon-container-active');
                    blackScreen.classList.add('black-screen-active');
                }
            }

        })
    });

    closeFooterDataBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            footerDataIconsContainer.forEach(cont => cont.classList.remove('mobile-footer-data-icon-container-active'));
            blackScreen.classList.remove('black-screen-active');
        })

    });
    blackScreen.addEventListener('click', () => {
        footerDataIconsContainer.forEach(cont => cont.classList.remove('mobile-footer-data-icon-container-active'));
        blackScreen.classList.remove('black-screen-active');
    });

    //Para llamar cuando toca
    /* const phoneNumber = '+541159442644'
    callNumber.addEventListener('click', () => {
        window.location.href = `tel:${phoneNumber}`;
    });
 */
   /*  copyNumber.addEventListener('click', () => {
        navigator.clipboard.writeText(phoneNumber)
        copyNumber.innerHTML = 'Número copiado'
        setTimeout(() => {
            copyNumber.innerHTML = 'Copiar número de teléfono en portapapeles'
        }, 2000)
    }) */

    // Para copiar al portapapeles
    const address = 'Avenida Santa Fé 2911 3 F, C1425 Buenos Aires'
    copyAddress.addEventListener('click', () => {
        navigator.clipboard.writeText(address)
        copyAddress.innerHTML = '<p class="copy-msg">Dirección copiada</p>'
        setTimeout(() => {
            copyAddress.innerHTML = `Av. Santa Fé 2911 3ºF<i class='bx bx-copy'></i>`
        }, 2000)
    })

    const mobilePhone = '+541124852020'
    copyMobileNumberBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(mobilePhone)
        mobileNumberContainer.innerHTML = '<p class="copy-msg">Número copiado</p>'
        setTimeout(() => {
            mobileNumberContainer.innerHTML = `Cel: 11 2485 2020<i class='bx bx-copy copy-mobile-number'></i><i class='bx bx-phone call-mobile-number' ></i>`
        }, 2000)
    })

    callMobileNumber.addEventListener('click', () => {
        window.location.href = `tel:${mobilePhone}`;
    });

    const phone = '+541148245430'
    copyPhoneNumberBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(phone)
        phoneNumberContainer.innerHTML = '<p class="copy-msg">Número copiado</p>'
        setTimeout(() => {
            phoneNumberContainer.innerHTML = `Tel: 4824 5430<i class='bx bx-copy copy-phone-number'></i><i class='bx bx-phone call-phone-number' ></i>`
        }, 2000)
    })

    callPhoneNumber.addEventListener('click', () => {
        window.location.href = `tel:${phone}`;
    });
 

})