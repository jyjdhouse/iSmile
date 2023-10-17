const db = require('../database/models');
const jwt = require('jsonwebtoken');
const isJwtError = require('../utils/isJwtError');
const getRelativePath = require('../utils/getRelativePath');
const webTokenSecret =  process.env.JSONWEBTOKEN_SECRET;
const getUser = require('../utils/getUser');

const userLogged = async (req, res, next) => {
    // Ruta de la que proviene
    let lastPath = getRelativePath(req.headers?.referer);

    try {
        let userInCookie;
        res.locals.isLogged = false;
        req.session.userLoggedId = null;
        //Agarro la cookie del token
        const token = req.cookies?.userAccessToken;
        // Ruta a la que quiere ir
        let pathToGo = getRelativePath(req.url);
        // Si quiere ir a logout no quiero nada de aca
        if (pathToGo == '/user/logout') return next();
        if (token) {
            const decodedData = jwt.verify(token, webTokenSecret);
            if (decodedData) { //Si verifico el token, solo agarro el id
                userInCookie = await getUser(decodedData?.id);
                userInCookie && delete userInCookie.password; // Para no llevar la password session
            } else { //Si no lo verifica, lo deslogueo
                res.clearCookie('userAccessToken');
                res.clearCookie('adminToken');
                delete req.session.userLoggedId;
                return res.redirect(lastPath)
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
        if (isJwtError(error)) { //Si es error de jwt
            res.clearCookie('userAccessToken');
            res.clearCookie('adminToken');
            let msg = "Ha ocurrido un error, por favor vuelve a iniciar sesion"
            return res.redirect(`${lastPath}?alert=${msg}`);
        }
        return res.send(error)
    }
}

module.exports = userLogged;