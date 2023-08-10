const jwt = require('jsonwebtoken');
const secret = require('../utils/secret').secret;

module.exports = (req, res, next) => {
    const token = req.cookies.userAccessToken; // Obtener el token desde la cookie "token"
    if (token) {
        let userId;
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // Si el token no es válido, borra la cookie "token" y continua con la solicitud
                userId = null;
            } else {
                // Si el token es válido, agrega el objeto "decoded" a la solicitud para que esté disponible en todas las rutas y controladores
                userId = decoded.id;
            }
            if (!userId) { //Si no viene el userID, no se chekeo el token ==> devuelvo error en la solicitud
                const error = new Error('Error en la solicitud, debes iniciar sesion nuevamente');
                // Devolviendo una respuesta de error
                return res.status(404).json({
                    ok: false,
                    error: error.message
                });
            }
            req.userId = userId;
            next();
        });
    } else { //Si no hay token, entonces devuelvo error en la peticion
        const error = new Error('Error en la solicitud, debes iniciar sesion nuevamente');
        // Devolviendo una respuesta de error
        return res.status(404).json({
            ok: false,
            error: error.message
        });
    }
}