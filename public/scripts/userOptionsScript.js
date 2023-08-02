window.addEventListener('load', () => {
    const blackScreen = document.querySelector('.black-screen');
    // Logica para hacer aparecer el login
    const userOptionsPopup = document.querySelector('.user-options-popup');
    const userOptions = document.querySelectorAll('.user-options-popup-option');
    const userOptionsFirstColumn = document.querySelector('.user-options-first-column');
    
    // Boton del usuario
    const userOptionsTriggerBtn = document.querySelector('.user-options-trigger-btn');

    // Boton de x
    const closeUserOptionsBtn = document.querySelector('.close-user-options-popup');
    // Boton de <--
    const backUserOptionsBtn = document.querySelector('.back-user-option-btn');

    // Si toca en el boton del usuario sale el userOptions
    userOptionsTriggerBtn?.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.add('black-screen-active');
        userOptionsPopup.classList.add('user-options-popup-active');
    });

    // Para sacar
    blackScreen.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.remove('black-screen-active');
        userOptionsPopup.classList.remove('user-options-popup-active');

        
    });
    closeUserOptionsBtn.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.remove('black-screen-active');
        userOptionsPopup.classList.remove('user-options-popup-active');
        // Le saco la clase a cada opción para que se traslade
        userOptions.forEach(opt => {
            opt.classList.remove('translate-option-left');
            opt.querySelector('.error-msg')?.remove();
            // Borro el valor de los input
            opt.querySelectorAll('input').forEach(inp=>inp.value='');
            opt.querySelector('button').classList.remove('send-form-button-error');
        });
        // Le saco la clase active a la flecha para atras
        backUserOptionsBtn.classList.remove('back-user-option-btn-active');
    });
    
    // Una vez que mandan el login Form
    const loginForm = document.querySelector('.login-form');
    const registForm = document.querySelector('.regist-form');
    const checkIfFormIsComplete = (form) => {
        const inputs = form.querySelectorAll('input');
        let flag = true
        // Voy por cada input del form
        inputs.forEach(input => {
            // Si esta vacio le devuelvo false
            if (!input.value) {
                flag = false
            };
        });
        return flag
    }
    const createErrorMsg = (msg) => {
        const paragraph = document.createElement('p');
        paragraph.classList.add('error-msg');
        paragraph.textContent = msg;
        return paragraph
    }
    // Logica para mostrar/ocultar contrasena
    const showPassBtn = document.querySelectorAll('.show-password-btn');
    const hidePassBtn = document.querySelectorAll('.hide-password-btn')

    showPassBtn.forEach(btn => { //Para mostrar
        btn?.addEventListener('click', () => {
            let field = btn.closest('.pass-field');
            field.querySelector('input').type = 'text';
            field.querySelector('.hide-password-btn').classList.remove('hidden');
            btn.classList.add('hidden');
        });
    });
    hidePassBtn.forEach(btn => { //Para ocultar
        btn?.addEventListener('click', () => {
            let field = btn.closest('.pass-field');
            field.querySelector('input').type = 'password';
            field.querySelector('.show-password-btn').classList.remove('hidden');
            btn.classList.add('hidden');
        });
    });
    loginForm?.addEventListener('submit', (e) => {
        let formIsComplete = checkIfFormIsComplete(loginForm);
        // Si esta incompleto...
        if (!formIsComplete) {
            e.preventDefault();
            const button = loginForm.querySelector('button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (!loginForm.querySelector('.error-msg')) {
                loginForm.querySelector('.button-container').appendChild(createErrorMsg('Debes completar todos los campos'));
            }
        }
    });

    registForm?.addEventListener('submit', (e) => {
        let formIsComplete = checkIfFormIsComplete(registForm);
        // Si esta incompleto...
        if (!formIsComplete) {
            e.preventDefault();
            const button = registForm.querySelector('button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (!registForm.querySelector('.error-msg')) {
                registForm.querySelector('.button-container').appendChild(createErrorMsg('Debes completar todos los campos'));
            }
        }
    });

    // LOGICA para "olvide mi contrasena"
    const forgetPassSection = document.querySelector('.forget-password-section');
    const forgetPassBtn = document.querySelector('.forget-password-btn');
    forgetPassBtn?.addEventListener('click',()=>{
        forgetPassSection.classList.add('forget-password-section-active')
    });

    // Si lo cierra...
    const closeForgetPasswordPopup = document.querySelector('.close-forget-password-section');
    closeForgetPasswordPopup.addEventListener('click',()=>{
        // Le saco el valor del input
        document.querySelector('#user-forget-password-email').value= '';
        forgetPassSection.classList.remove('forget-password-section-active');
    })

    // Capturo el "Recuperar que hace el pedido POST"
    const forgetPasswordLinkBtn = document.querySelector('.forget-password-link');
    forgetPasswordLinkBtn?.addEventListener('click',async()=>{
        // Capturo el valor del mail
        const userMail = document.querySelector('#user-forget-password-email')?.value;
        // Realizo un pedido por POST donde mando la info del user en cuestion con el mail
        // Hago el fetch
        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify({
                mail: userMail
            })
        }
        let response = await (await fetch('/api/user/forget-password', fetchOptions)).json();
        console.log(response);
        if(response.ok){
            alert(response.msg)
        }
        
    })

});