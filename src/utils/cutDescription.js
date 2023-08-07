const cutDescription = function (description) {
    // Eliminar etiquetas <p> y </p> utilizando una expresión regular
    const descWithoutHTMLElements = description.replace(/<\/?p>/g, "");
    const maxLength = 120
    const descriptionArray = descWithoutHTMLElements.split(" ");
    let result = "";
    let count = 0;

    for (const word of descriptionArray) {
        count += word.length + 1; // Sumar la longitud de la palabra y un espacio
        if (count > maxLength) {
            result += "...";
            break;
        }
        result += word + " ";
    }

    return result.trim();
};

module.exports = cutDescription