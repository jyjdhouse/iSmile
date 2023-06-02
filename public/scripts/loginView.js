import { activateClass, deactivateClass } from './utils.js';
window.addEventListener('load', () => {
    const loginBtns = document.querySelectorAll('.login-toggler');
    const body = document.querySelector('body');
    const exitBtn = document.querySelector('.login-exit-btn-container');
    const registrationFormBtns = document.querySelectorAll('.open-registration-btn');
    const closeRegistrationForm = document.querySelector('.registration-exit-btn-container');
    const userLoggedContainer = document.querySelector('.user-logged-container');
    const loggedMenuToggler = document.querySelector('.logged-menu-toggler');

    const blackScreen = 'black-screen';
    const loginRegisterContainer = 'login-register-container';
    const sideNavbar = 'side-navbar-container';
    const searchSection = 'search-section-container';
    const registrationFormContainer = 'registration-form-container';
    const loggedMenuContainer  = 'logged-menu-container';
    const userLoggedName = 'user-logged-name';

    let [classesToActivate,classesToDeactivate] = [];
 
    //TODO: Terminar logica de abrir login popup desde ambas
    loginBtns?.forEach(btn=>{
        btn.addEventListener('click', () => { //ABRIR LOGIN VIEW
            classesToActivate = [loginRegisterContainer,blackScreen];
            activateClass(classesToActivate);
    
            classesToDeactivate = [sideNavbar,searchSection];
            deactivateClass(classesToDeactivate);
            
            body.classList.add('noScroll');
    
        });
    });

    exitBtn.addEventListener('click', () => {
        classesToDeactivate = [loginRegisterContainer,blackScreen];
        deactivateClass(classesToDeactivate);

        body.classList.remove('noScroll');

    });
    document.querySelector(`.${blackScreen}`).addEventListener('click', () => {
        classesToDeactivate = [loginRegisterContainer,blackScreen,registrationFormContainer];
        deactivateClass(classesToDeactivate);
        
        body.classList.remove('noScroll');
    });

    registrationFormBtns.forEach(btn => {
        btn.addEventListener('click',()=>{
            body.classList.add('noScroll');
    
            classesToActivate = [registrationFormContainer,blackScreen];
            activateClass(classesToActivate);
        });
    });
    
    closeRegistrationForm?.addEventListener('click',()=>{
        classesToDeactivate = [registrationFormContainer];
        // Solo si NO esta activo el login saco blackScreen
        if(!document.querySelector(`.${loginRegisterContainer}`).classList.contains(`${loginRegisterContainer}-active`)) classesToDeactivate.push(blackScreen)
        deactivateClass(classesToDeactivate);
        body.classList.remove('noScroll');
    });

    // LOGICA PARA ABRIRLO DE UNA SI LLEGAN ERRORES
    const queryString = window.location.search; //obtener la cadena de consulta
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('loginErrors')){ //Si vienen errores
        body.classList.add('noScroll');

        classesToActivate = [loginRegisterContainer,blackScreen];
        activateClass(classesToActivate);
    }
    // LOGICA PARA MOSTRAR CONTRASENA
    const showPassBtn = document.querySelectorAll('.show-password-btn');
    const hidePassBtn = document.querySelectorAll('.hide-password-btn')
    const passInput = document.querySelectorAll('.input-password');
    
    showPassBtn.forEach(btn=>{ //Para mostrar
        btn.addEventListener('click', () => {
            let place = btn.dataset.place;
            passInput.forEach(tag=>{
                if (tag.dataset.place == place){
                    tag.type = 'text';
                }
            });
            hidePassBtn.forEach(tag=>{
                if (tag.dataset.place == place){
                    tag.classList.remove('hidden');
                }
            });
            btn.classList.add('hidden'); 
        });
    });
    hidePassBtn.forEach(btn=>{ //Para ocultar
        btn.addEventListener('click', () => {
            let place = btn.dataset.place;
            passInput.forEach(tag=>{
                if (tag.dataset.place == place){
                    tag.type = 'password';
                }
            });
            showPassBtn.forEach(tag=>{
                if (tag.dataset.place == place){
                    tag.classList.remove('hidden');
                }
            });
            btn.classList.add('hidden'); 
        });
    });

    // LOGICA PARA MOSTRAR LOGGED MENU AL PASAR POR EL NOMBRE (DESKTOP)
    userLoggedContainer?.addEventListener('mouseover',()=>{
        activateClass([loggedMenuContainer,userLoggedName]);
    });
    let timeoutId = null;
    const menuContainer = document.querySelector(`.${loggedMenuContainer}`);
    menuContainer?.addEventListener('mouseout', ()=>{
      clearTimeout(timeoutId);
    });
    
    document.addEventListener('mousemove', function(e) {
      const isInsideUserLoggedContainer = userLoggedContainer?.contains(e.target);
      const isInsideLoggedMenuContainer = menuContainer?.contains(e.target);
      
      if (!isInsideUserLoggedContainer && !isInsideLoggedMenuContainer) {
        if (!timeoutId) {
          timeoutId = setTimeout(()=>{
            deactivateClass([loggedMenuContainer,userLoggedName])
            timeoutId = null;
          }, 200); // Agregamos un retraso de 200 ms antes de ocultar el menú
        }
      } else {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
});