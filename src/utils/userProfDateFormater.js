module.exports = function(date) {
    const fechaObjeto = new Date(date);

    const año = fechaObjeto.getFullYear();
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaObjeto.getDate().toString().padStart(2, '0');
    
    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
}