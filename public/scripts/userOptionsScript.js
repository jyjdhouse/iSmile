window.addEventListener('load', () => {
    const blackScreen = document.querySelector('.black-screen');
    // Logica para hacer aparecer el login
    const userOptionsPopup = document.querySelector('.user-options-popup');
    const userOptions = document.querySelectorAll('.user-options-popup-option');
    const userOptionsFirstColumn = document.querySelector('.user-options-first-column');
    const loginForm = document.querySelector('.login-popup');
    const registForm = document.querySelector('.regist-popup');
    // Boton del usuario
    const userOptionsTriggerBtn = document.querySelector('.user-options-trigger-btn');
    // Boton de iniciar-sesion / Registrarse
    const loginTriggerBtns = document.querySelectorAll('.login-trigger-btn');
    const registerTriggerBtns = document.querySelectorAll('.regist-trigger-btn');
    // Boton de x
    const closeUserOptionsBtn = document.querySelector('.close-user-options-popup');
    // Boton de <--
    const backUserOptionsBtn = document.querySelector('.back-user-option-btn');

    // Si toca en el boton del usuario sale el userOptions
    userOptionsTriggerBtn.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.add('black-screen-active');
        userOptionsPopup.classList.add('user-options-popup-active');
    });
    loginTriggerBtns.forEach(btn => {
        // Toca en el "iniciar sesion"
        btn.addEventListener('click', () => {
            // Le agrego la clase a cada opcion para que se traslade
            userOptionsFirstColumn.classList.add('translate-option-left');
            loginForm.classList.add('translate-option-left');
            // Le agrego la clase active para que se vea la flechita de volver
            backUserOptionsBtn.classList.add('back-user-option-btn-active');
        });
    });
    registerTriggerBtns.forEach(btn => {
        // Toca en el "Registrarse"
        btn.addEventListener('click', () => {
            // Le agrego la clase a cada opcion para que se traslade
            userOptionsFirstColumn.classList.add('translate-option-left');
            registForm.classList.add('translate-option-left');
            // Le agrego la clase active para que se vea la flechita de volver
            backUserOptionsBtn.classList.add('back-user-option-btn-active');
        });
    });

    // Para sacar
    blackScreen.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.remove('black-screen-active');
        userOptionsPopup.classList.remove('user-options-popup-active');
        // Le saco la clase a cada opcion para que se traslade
        userOptions.forEach(opt => opt.classList.remove('translate-option-left'));
        // Le saco la clase active a la flecha para atras
        backUserOptionsBtn.classList.remove('back-user-option-btn-active');
    });
    closeUserOptionsBtn.addEventListener('click', () => {
        // La agrego por si no la tenia
        blackScreen.classList.remove('black-screen-active');
        userOptionsPopup.classList.remove('user-options-popup-active');
        // Le saco la clase a cada opcion para que se traslade
        userOptions.forEach(opt => opt.classList.remove('translate-option-left'));
        // Le saco la clase active a la flecha para atras
        backUserOptionsBtn.classList.remove('back-user-option-btn-active');
    });
    // Si toca la flecha para atras
    backUserOptionsBtn.addEventListener('click',()=>{
        // Le saco la clase a cada opcion para que se traslade
        userOptions.forEach(opt => opt.classList.remove('translate-option-left'));
        // Le saco la clase active a la flecha para atras
        backUserOptionsBtn.classList.remove('back-user-option-btn-active');
    })

    // Una vez que mandan el login Form
    const checkIfFormIsComplete = (form) => {
        const inputs = form.querySelectorAll('input');
        let flag = true
        // Voy por cada input del form
        inputs.forEach(input => {
            // Si esta vacio le devuelvo false
            if (!input.value) {
                console.log('Esta incompleto');
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
    const form = document.querySelector('.login-popup');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formIsComplete = checkIfFormIsComplete(form);
        // Si esta incompleto...
        if (!formIsComplete) {
            const button = form.querySelector('.login-button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (!form.querySelector('.error-msg')) {
                form.querySelector('.button-container').appendChild(createErrorMsg('Debes completar todos los campos'));
            }
        }
    })

});