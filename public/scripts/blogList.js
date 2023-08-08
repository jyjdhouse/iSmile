import { getPrettyDate, getPrettyDateReversed } from './utils.js'
window.addEventListener('load', () => {
    // Logica para agarrar todas las cards y pintarle bien la fecha
    const blogCards = document.querySelectorAll('.blog-link');
    blogCards.forEach(card => {
        const date = card.querySelector('.blog-date');
        const prettyDate = getPrettyDateReversed(date.innerText);
        date.innerHTML = prettyDate
    });
});