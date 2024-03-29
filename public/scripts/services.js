import { checkIfIsInScreen } from "./utils.js";
/* window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0)
}) */
window.addEventListener('load', () => {
    let serviceCards = document.querySelectorAll('.service-card')
    const servicesCards = Array.from(document.querySelectorAll('.service-card'));
    let serviceLabels = document.querySelectorAll('.service-card-visible-part')
    const openDropdown = (card) => {
        let wrapper = card.querySelector('.service-card-wrapper')
        let dropdown = card.querySelector('.service-card-dropdown')
        let iconsContainer = card.querySelector('.toggle-dropdown-icons-container')
        let minusBtn = card.querySelector('.bx-minus')
        let plusBtn = card.querySelector('.bx-plus-circle')
        let serviceLabel = card.querySelector('.service-card-visible-part')
        iconsContainer.classList.toggle('toggle-dropdown-icons-container-active')
        dropdown.classList.toggle('service-card-dropdown-active')
        wrapper.classList.toggle('service-card-wrapper-active')
        minusBtn.classList.toggle('toggle-dropdown-inactive')
        plusBtn.classList.toggle('toggle-dropdown-inactive')
        serviceLabel.classList.toggle('service-card-visible-part-active')
        card.classList.toggle('service-card-inactive')
        card.classList.toggle('service-card-active')
    }

    const handleVisibleServiceCard = (card) => {
        card.classList?.add('service-card-visible');
        // Me fijo que hijo es asi le doy transition Delay
        const container = document.querySelector('.service-cards-container');
        const cardIndex = Array.from(container.children).indexOf(card);
        // Si no scrolleo el usuario, quiere decir que son las primeras que se muestran 
        // Entonces le doy un transition delay
        if (window.pageXOffset === 0 && window.pageYOffset === 0) {

            card.style.animationDelay = `${cardIndex * .5}s`;
        }
    }



    const toggleDropdownBtn = document.querySelectorAll('.toggle-dropdown')
    const minus = document.querySelectorAll('.bx-minus')

    let url = new URL(window.location.href);

    // Obtener el objeto URLSearchParams que contiene los parámetros de consulta
    let queryParams = url.searchParams;

    if (queryParams && queryParams.has('open')) {

        // agarro valor del open y hago find para saber a cual div scrollear
        let paramService = queryParams.get('open');
        serviceCards.forEach((serv, i) => {
            const observer = checkIfIsInScreen(.3, handleVisibleServiceCard, serv)
            // Me fijo si aparece en pantalla
            observer.observe(serv)
            if (i == paramService) {


                setTimeout(() => {
                    let targetDivTopOffset = serv.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: targetDivTopOffset,
                        behavior: 'smooth',
                    });
                    setTimeout(() => {
                        openDropdown(serv)
                    }, 1000);
                    
                }, 2500);


            }
        });


    } else {
        // Voy por cada una para preguntarle si aparece en pantalla
        servicesCards.forEach((card, i) => {
            const observer = checkIfIsInScreen(.3, handleVisibleServiceCard, card)
            // Me fijo si aparece en pantalla
            observer.observe(card)
        })
    }


    minus.forEach(min => {
        min.classList.add('toggle-dropdown-inactive')
    })



    const toggleDropdown = () => {
        serviceLabels.forEach(label => {
            label.addEventListener('click', () => {
                let wrapper = label.closest('.service-card-wrapper')
                let serviceCard = label.closest('.service-card')
                let dropdown = serviceCard.querySelector('.service-card-dropdown')
                let iconsContainer = serviceCard.querySelector('.toggle-dropdown-icons-container')
                let minusBtn = serviceCard.querySelector('.bx-minus')
                let plusBtn = serviceCard.querySelector('.bx-plus-circle')
                
                iconsContainer.classList.toggle('toggle-dropdown-icons-container-active')
                dropdown.classList.toggle('service-card-dropdown-active')
                wrapper.classList.toggle('service-card-wrapper-active')
                minusBtn.classList.toggle('toggle-dropdown-inactive')
                plusBtn.classList.toggle('toggle-dropdown-inactive')
                label.classList.toggle('service-card-visible-part-active')
                serviceCard.classList.toggle('service-card-inactive')
                serviceCard.classList.toggle('service-card-active')

            })
        })
    }
    toggleDropdown()




})