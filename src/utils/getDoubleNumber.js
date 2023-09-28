module.exports = function getDoubleNumber(num) {
    let doubleNumber = num / 100;
    return parseFloat(doubleNumber.toFixed(2));
}