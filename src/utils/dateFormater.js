// Recibe la fecha de la db y la convierte a dd/mm/yyyy
module.exports = function (date) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
}