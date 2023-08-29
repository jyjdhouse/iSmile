import { createErrorMsg, passwordValidation } from './utils.js'
window.addEventListener('load', () => {
    // Me fijo si es vista de errores para poner un alert
    const params = new URLSearchParams(window.location.search);
    const errors = params.get('errors');
    if(errors)alert('Ha ocurrido un error. Intente nuevamente')
    // Logica para chequear en el momento si la contrasena cumple con los requisitos
    const form = document.querySelector('.change-password-form');
    form.querySelector('.error-msg')?.remove();
    form.addEventListener('submit', (e) => {
        const passwordInput = form.querySelector('input[name="password"]');
        const rePasswordInput = form.querySelector('input[name="re-password"]');
        // Si la contrasena no cumple con los requisitos...
        if (!passwordValidation(passwordInput.value)) {
            e.preventDefault();
            const button = form.querySelector('button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (!form.querySelector('.error-msg')) {
                form.querySelector('.change-password-button-container').appendChild(createErrorMsg('La contraseña debe cumplir con los requisitos'));
            }
        }
        // Si no son iguales...
        if(passwordInput.value !== rePasswordInput.value){
            e.preventDefault();
            const button = form.querySelector('button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (!form.querySelector('.error-msg')) {
                form.querySelector('.change-password-button-container').appendChild(createErrorMsg('Las contraseñas deben coincidir'));
            }
        }
        
    });
});