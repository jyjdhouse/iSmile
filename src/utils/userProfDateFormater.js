const { parseISO, format } = require('date-fns');

module.exports = function(date) {
    let fechaObjeto = parseISO(date);


    let año = format(fechaObjeto, 'yyyy');
    let mes = format(fechaObjeto, 'MM');
    let dia = format(fechaObjeto, 'dd');


    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
}