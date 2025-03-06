const { parseISO, format, addDays } = require('date-fns');

module.exports = function(date) {
    let fechaObjeto = parseISO(date);


    let fechaSumada = addDays(fechaObjeto, 1);

    let año = format(fechaSumada, 'yyyy');
    let mes = format(fechaSumada, 'MM');
    let dia = format(fechaSumada, 'dd');

    let fechaFormateada = `${año}-${mes}-${dia}`;
    console.log(fechaFormateada)
    return fechaFormateada;
}