import { checkIfIsInScreen } from "./utils.js";
window.addEventListener('DOMContentLoaded',()=>{
    window.scrollTo(0,0)
})
window.addEventListener('load', () => {
    const handleVisibleServiceCard = (card) => {
        card.classList?.add('service-card-visible');
        // Me fijo que hijo es asi le doy transition Delay
        const container = document.querySelector('.service-cards-container');
        const cardIndex = Array.from(container.children).indexOf(card);
        // Si no scrolleo el usuario, quiere decir que son las primeras que se muestran 
        // Entonces le doy un transition delay
        if (window.pageXOffset === 0 && window.pageYOffset === 0) {
            console.log('NO SCROLLEO');
            card.style.animationDelay = `${cardIndex*.5}s`;
        }
    }
    const servicesCards = document.querySelectorAll('.service-card');
    // Voy por cada una para preguntarle si aparece en pantalla
    servicesCards.forEach((card,i) => {
        const observer = checkIfIsInScreen(.3, handleVisibleServiceCard,card)
        // Me fijo si aparece en pantalla
        observer.observe(card)
    })

    const toggleDropdownBtn = document.querySelectorAll('.toggle-dropdown')
    const minus = document.querySelectorAll('.bx-minus')
    let isModalOpen = false

    minus.forEach(min => {
        min.classList.add('toggle-dropdown-inactive')
    })

    const toggleDropdown = () => {
        toggleDropdownBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                let wrapper = btn.closest('.service-card-wrapper')
                let serviceCard = btn.closest('.service-card')
                let dropdown = serviceCard.querySelector('.service-card-dropdown')
                let iconsContainer = serviceCard.querySelector('.toggle-dropdown-icons-container')
                let minusBtn = serviceCard.querySelector('.bx-minus')
                let plusBtn = serviceCard.querySelector('.bx-plus-circle')
                let serviceLabel = serviceCard.querySelector('.service-card-visible-part')
                iconsContainer.classList.toggle('toggle-dropdown-icons-container-active')
                dropdown.classList.toggle('service-card-dropdown-active')
                wrapper.classList.toggle('service-card-wrapper-active')
                minusBtn.classList.toggle('toggle-dropdown-inactive')
                plusBtn.classList.toggle('toggle-dropdown-inactive')
                serviceLabel.classList.toggle('service-card-visible-part-active')       
                serviceCard.classList.toggle('service-card-inactive')
                serviceCard.classList.toggle('service-card-active')
                
            })
        })
    }
    toggleDropdown()

    const cardsContainer = document.querySelector('.service-cards-container')


})