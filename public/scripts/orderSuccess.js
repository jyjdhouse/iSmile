import { formatPriceNumber } from "./utils.js";

window.addEventListener('load',()=>{
    // Muestro el precio con punto
    formatPriceNumber();

    // Borro el carro si lo tenia
    localStorage.removeItem('temporalCart');
});
