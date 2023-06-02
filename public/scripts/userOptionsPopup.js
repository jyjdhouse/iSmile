import { activateClass, deactivateClass, disableAllPopups, getLoggedUser } from './utils.js';
window.addEventListener('load', async () => {
    const userIsLogged = (await getLoggedUser()).userId;
    // LOGICA que .. minutos despues te salte el popup
    const userOptionsPopup = 'user-options-popup';
    const closePopupBtn = document.querySelector('.close-user-options-popup');
    const blackScreen = 'black-screen';
    const body = document.querySelector('body');
    // Variable para almacenar el tiempo límite en milisegundos
    let timeLimit = 60 * 1000; //1 minuto
    // Variable para almacenar el tiempo de inicio
    let startTime;
    let intervalId;
    // Verificar si el contador ya ha comenzado previamente
    const isTimerStarted = localStorage.getItem('timerStarted');
    console.log(window.performance);
    // Función para verificar el tiempo de navegación y mostrar el popup si ha pasado el tiempo límite
    function checkTimeLimit() {

        const loginPopup = document.querySelector('.login-register-container');
        const registPopup = document.querySelector('.registration-form-container');
        const currentTime = new Date().getTime();
        startTime = parseInt(localStorage.getItem('startTime'));
        const elapsedTime = currentTime - startTime;
        const userOptionsPopupElement = document.querySelector(`.${userOptionsPopup}`);
        // Condicion: que exista el elemento, que no contenga la clase active, y que tanto loginPopup como RegistPopUP no esten active
        const condition = userOptionsPopupElement &&
            !(userOptionsPopupElement?.classList.contains(`${userOptionsPopup}-active`)) &&
            (!loginPopup.classList.contains('login-register-container-active') && !registPopup.classList.contains('registration-form-container-active'))
        if (elapsedTime >= timeLimit) {//Si el tiempoLimite llego
            // Reinicio el startTime
            localStorage.setItem('startTime', new Date().getTime());
            if (condition) { //Si llego a ese tiempo navegando y se cumple la condicion...
                //Si esta en el menu por ejemplo, y se cumple el tiempo para que le aparezca esta opcion,
                //tengo que sacar el menu para mostrar esto
                disableAllPopups();
                activateClass([userOptionsPopup, blackScreen]);
                body.classList.add('noScroll');
            }
        }
    };
    // Funcion que va preguntando cada 1 segundo
    function startTimer() {
        //Si no hay usuario loggeado se la funcion del popup
        if (!userIsLogged) {
            if (!isTimerStarted) { //Si el contador no habia arrancado
                // Establecer el tiempo de inicio en el almacenamiento local del navegador
                localStorage.setItem('timerStarted', 'true');
                localStorage.setItem('startTime', new Date().getTime());

            }
            intervalId = setInterval(checkTimeLimit, 1000); // Verificar cada segundo
        } else {
            localStorage.removeItem('timerStarted');
            localStorage.removeItem('startTime');
        }

    }
    startTimer();
    function listenPopupBtns() {
        const loginPopup = 'login-register-container';
        const registrationFormContainer = 'registration-form-container';
        const loginBtn = document.getElementById('user-options-login-btn');
        const registerBtn = document.getElementById('user-options-register-btn');
        const continueAsGuestBtn = document.querySelector('#continue-as-guest-btn');
        const popupTriggers = document.querySelectorAll('.trigger-user-options-btn');
        // Si tocan Loguearse/Registrarse, saco el popup y cleareo el intervalo
        loginBtn?.addEventListener('click', () => {
            deactivateClass([userOptionsPopup]);
            activateClass([loginPopup]);
            clearInterval(intervalId);
        })
        registerBtn?.addEventListener('click', () => {
            deactivateClass([userOptionsPopup]);
            activateClass([registrationFormContainer]);
            clearInterval(intervalId);
        })

        // Para cerrar el popUp
        closePopupBtn?.addEventListener('click', () => {
            deactivateClass([userOptionsPopup, blackScreen]);
            body.classList.remove('noScroll');
        });
        document.querySelector(`.${blackScreen}`)?.addEventListener('click', () => { // CERRAR MENU
            deactivateClass([userOptionsPopup, blackScreen]);
            body.classList.remove('noScroll');
        });
        continueAsGuestBtn?.addEventListener('click', () => { // CERRAR MENU
            deactivateClass([userOptionsPopup, blackScreen]);
            body.classList.remove('noScroll');
        });
        // Esto es para activar el popup devuelta
        //  los triggers son tanto register como login close buttons & close buttons del popup
        popupTriggers.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Estoy para activar devuelta');
                // Una vez que sale el popup, reinicio el startTime y puedo cambiar el timeLimit
                localStorage.setItem('startTime', new Date().getTime());
                clearInterval(intervalId);
                startTimer();
            })
        })
    }
    listenPopupBtns();
    // Si toca la wishlist y no esta logueado...
    document.querySelector('.wishlist-container').addEventListener('click', () => {
        if (!userIsLogged) {
            disableAllPopups();
            activateClass([userOptionsPopup, blackScreen]);
            body.classList.add('noScroll');
        }
    });
    // Si quiere likear un producto y no esta logueado...
    const favContainers = document.querySelectorAll('.quick-fav-container');
    favContainers.forEach(cont => {
        cont.addEventListener('click', (e) => {
            if (!userIsLogged) {
                // Esto es para que no aparezca el corazon
                e.stopImmediatePropagation();
                disableAllPopups();
                activateClass([userOptionsPopup, blackScreen]);
                body.classList.add('noScroll');
            }
        })
    })
})