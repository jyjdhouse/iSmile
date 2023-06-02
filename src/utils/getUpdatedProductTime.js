module.exports = function (time) {
    // Obtener la fecha y hora actual
    var now = new Date();
    // Obtengo la fecha del argumento
    time = new Date(time);
    // Calcular la diferencia en milisegundos entre la fecha actual y la fecha argumento
    var difference = now.getTime() - time.getTime();

    // Convertir la diferencia de milisegundos a minutos, horas y días
    var minutes = Math.floor(difference / (1000 * 60));
    var hours = Math.floor(difference / (1000 * 60 * 60));
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));

    // Devolver el string correspondiente según la diferencia calculada
    if (minutes < 60) {
        if(minutes == 1){
            return "Hace " + minutes + " minuto";
        }
        return "Hace " + minutes + " minutos";
    } else if (hours < 24) {
        if(hours == 1){
            return "Hace " + hours + " hora";
        }
        return "Hace " + hours + " horas";
    } else {
        if(days == 1){
            return "Hace " + days + " día";
        }
        return "Hace " + days + " días";
    }
};