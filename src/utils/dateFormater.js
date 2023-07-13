// Recibe la fecha de la db y la convierte a dd/mm/yyyy
module.exports = function (date) {
    date = new Date(date);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1; // Los meses en JavaScript comienzan en 0, por lo que se suma 1 al mes.
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}