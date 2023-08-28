// Recibe la fecha de la db y la convierte a dd/mm/yyyy
module.exports = function (date) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    
    console.log(formattedDate);
    
    return formattedDate;
}