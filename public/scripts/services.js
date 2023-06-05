import { checkIfIsInScreen } from "./utils.js";
window.addEventListener('load', () => {
    const handleVisibleServiceCard = (card) => {
        card.classList?.add('service-card-visible')
    }
    const servicesCards = document.querySelectorAll('.service-card');
    // Voy por cada una para preguntarle si aparece en pantalla
    servicesCards.forEach((card,i) => {
        // card.style.animationDelay = `${i*1}s`;
        const observer = checkIfIsInScreen(.3, handleVisibleServiceCard,card)
        // Me fijo si aparece en pantalla
        observer.observe(card)
    })
})