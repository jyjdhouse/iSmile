// Recibe la fecha de la db y la convierte a dd/mm/yyyy
module.exports = function (date) {
    date = new Date(date);
    
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    
    return formattedDate;
}