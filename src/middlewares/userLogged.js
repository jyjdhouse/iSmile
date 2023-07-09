const db = require('../database/models');
const jwt = require('jsonwebtoken');
const isJwtError = require('../utils/isJwtError');
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

const userLogged = async (req, res, next) => {

    try {
        let userInCookie;

        res.locals.isLogged = false;
        req.session.userLoggedId = null;
        //Agarro la cookie del token
        const token = req.cookies?.userAccessToken;
        if (token) {
            const decodedData = jwt.verify(token, secret);
            if (decodedData) { //Si verifico el token, solo agarro el id
                userInCookie = await db.User.findOne({
                    where: {
                        id: decodedData?.id
                    },
                    attributes: ['id']
                });
            }
        };
        if (userInCookie) { //Si encontro el usuario en la cookie
            req.session.userLoggedId = userInCookie.id; //SESSION SIEMPRE EN REQ 
        };

        if (req.session && req.session.userLoggedId) {
            let user = await db.User.findByPk(req.session.userLoggedId, {
                attributes: {
                    exclude: ['password']
                }
            });
            res.locals.isLogged = true;
            res.locals.userLogged = user;
        };
        return next();

    } catch (error) {
        let lastPath = getRelativePath(req.headers.referer);
        console.log('Falle en userLoggedMiddleware: ' + error);
        if(isJwtError(error)){ //Si es error de jwt
            let msg = "Ha ocurrido un error, por favor vuelve a iniciar sesion"
            return res.redirect(`${lastPath}?alert=${msg}`);
        }
        return res.send(error)
    }
}

module.exports = userLogged;