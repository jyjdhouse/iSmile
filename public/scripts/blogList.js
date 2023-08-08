import { getPrettyDate, getPrettyDateReversed } from './utils.js'
window.addEventListener('load', () => {
    // Logica para agarrar todas las cards y pintarle bien la fecha
    let blogCards = document.querySelectorAll('.blog-link'); 
    !blogCards.length ? blogCards = document.querySelectorAll('.last-blog-card'): null;
    blogCards.forEach(card => {
        const date = card.querySelector('.blog-date');
        const prettyDate = getPrettyDateReversed(date.innerText);
        date.innerHTML = prettyDate
    });
});