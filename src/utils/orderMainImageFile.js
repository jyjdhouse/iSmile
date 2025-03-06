//FUNCION QUE ORDENA EL ARRAY DE FILES POR MAIN IMAGE
module.exports = function (files) {
    let sortedFiles = [...files]; // Clonamos el array original para no modificarlo directamente

    const mainImageFile = sortedFiles.find((file) => file.main_image === 1);

    if (mainImageFile) {
        // Si se encontró un archivo con main_image = 1, lo movemos al primer lugar
        const mainImageIndex = sortedFiles.indexOf(mainImageFile);
        sortedFiles.splice(mainImageIndex, 1); // Eliminamos el archivo de su posición actual
        sortedFiles.unshift(mainImageFile); // Lo añadimos al principio del array
    };
    return sortedFiles
}