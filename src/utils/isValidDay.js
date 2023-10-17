//Me fijo si la fecha es dia de semana. TRUE para dias de semana, FALSE para finde
module.exports = function (date) {
    const day = date.getDay();
    // 0 representa domingo, 1 lunes, 2 martes, ... 6 sábado.
    return day >= 1 && day <= 5;
}