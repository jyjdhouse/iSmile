const db = require('../database/models');
const jwt = require('jsonwebtoken');
const isJwtError = require('../utils/isJwtError');
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;
const getUser = require('../utils/getUser');

const userLogged = async (req, res, next) => {
    // Ruta de la que proviene
    let lastPath = getRelativePath(req.headers?.referer);
    try {
        let userInCookie;
        res.locals.isLogged = false;
        req.session.userLoggedId = null;
        // Ruta a la que quiere ir
        let pathToGo = getRelativePath(req.url);
        // Si quiere ir a logout no quiero nada de aca
        if(pathToGo =='/user/logout') return next();
        //Agarro la cookie del token
        const token = req.cookies?.userAccessToken;
        if (token) {
            const decodedData = jwt.verify(token, secret);
            if (decodedData) { //Si verifico el token, solo agarro el id
                userInCookie = await getUser(decodedData?.id);
                delete userInCookie.password; // Para no llevar la password session
            }
        };
        if (userInCookie) { //Si encontro el usuario en la cookie
            req.session.userLoggedId = userInCookie.id; //SESSION SIEMPRE EN REQ 
        };

        if (req.session && req.session.userLoggedId) {
            res.locals.isLogged = true;
            res.locals.userLogged = userInCookie;
        };
        return next();

    } catch (error) {
        
        console.log('Falle en userLoggedMiddleware: ' + error);
        if(isJwtError(error)){ //Si es error de jwt
            let msg = "Ha ocurrido un error, por favor vuelve a iniciar sesion"
            return res.redirect(`${lastPath}?alert=${msg}`);
        }
        return res.send(error)
    }
}

module.exports = userLogged;