module.exports = function (password) {
    // Al menos 1 número
    const oneNumber = /[0-9]/.test(password);

    // Mínimo 6 caracteres
    const validLength = password.length >= 6;

    // Al menos 1 letra en mayúscula
    const oneUpperLetter = /[A-Z]/.test(password);

    return oneNumber && validLength && oneUpperLetter;

}