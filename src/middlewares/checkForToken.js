const jwt = require('jsonwebtoken');
const secret = require('../utils/secret').secret;

module.exports = (req, res, next) => {
    const token = req.cookies.userAccessToken; // Obtener el token desde la cookie "token"
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                // Si el token no es válido, borra la cookie "token" y continua con la solicitud
                req.userId = null;
                req.msg = 'Error en el token'
            } else {
                // Si el token es válido, agrega el objeto "decoded" a la solicitud para que esté disponible en todas las rutas y controladores
                req.userId = decoded.id;
                req.msg = 'Usuario encontrado';
                
            }
            console.log(req.msg);
            next();
        });
    } else {
        // Si no hay token, continúa con la solicitud
        req.userId = null;
        req.msg = 'Debes iniciar sesion nuevamente'
        console.log(req.msg);
        next();
    }
}