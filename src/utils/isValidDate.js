    module.exports = function (date) {
        const validDateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!date.match(validDateFormatRegex)) {
            return false; // El formato no es válido
        }
        const dateArray = date.split('-');
        const year = parseInt(dateArray[0]);
        const month = parseInt(dateArray[1]);
        const day = parseInt(dateArray[2]);

        if (month < 1 || month > 12 || day < 1 || day > 31) {
            return false; // El mes o día no son válidos
        }

        const daysInMonth = new Date(year, month, 0).getDate();

        if (day > daysInMonth) {
            return false; // El día es mayor que el número de días en el mes
        }

        return true;
    }