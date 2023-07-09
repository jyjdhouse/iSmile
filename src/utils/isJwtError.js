module.exports = function isJwtError(error) {
    // Verificar si es un error de token expirado (TokenExpiredError)
    if (error instanceof jwt.TokenExpiredError) {
        return true;
    }

    // Verificar si es un error de firma inválida (JsonWebTokenError)
    if (error instanceof jwt.JsonWebTokenError) {
        return true;
    }

    // Verificar si es un error al firmar el token (por ejemplo, clave secreta incorrecta)
    if (error instanceof jwt.JsonWebTokenError && error.name === 'JsonWebTokenError' && error.message === 'jwt.sign error') {
        return true;
    }

    // Otros tipos de errores relacionados con jsonwebtoken
    // Puedes agregar más verificaciones según tus necesidades
    // Por ejemplo, verificar si el mensaje de error contiene una cadena específica

    return false; // No es un error relacionado con jsonwebtoken
}