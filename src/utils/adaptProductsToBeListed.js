const getDeepCopy = require('./getDeepCopy');
module.exports = (products) => {
    // Copia profunda para poder editar valores
    products = getDeepCopy(products);
    // Ordeno el array
    products.sort((a, b) => b.id - a.id);
    products.forEach(product => {
        // Aca itero para a cada color de cada producto dejarle las files armadas para pintar en front
        product.colors.forEach(color => {
            color.files = product.files?.filter(file => file.colors_id == color.id);
            // Lo ordeno
            color.files?.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = color.files.indexOf(file);
                    color.files.splice(indexToRemove, 1);//Lo elimino
                    color.files.splice(1, 0, file); //Lo pongo 2do
                }
            });
        })
    });
    return products
}