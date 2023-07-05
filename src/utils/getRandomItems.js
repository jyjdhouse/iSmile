module.exports = function (array) { //Recorta el array con 3 elemntos random
    // Esta funcion es para aquellos array mayores a 3 elementos
    if(array.length<=3)return array
    var length = array.length;
    var randomIndexes = [];
    while (randomIndexes.length < 3) {
        var randomIndex = Math.floor(Math.random() * length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }
    // Va por los indices random del array
    var arrayToReturn = randomIndexes.map(i => {
        return array[i];
    });
    return arrayToReturn;
}