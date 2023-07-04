const db = require('../database/models');
const jwt = require('jsonwebtoken');
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

const userIsIncomplete = async (req, res, next) => {
    try {
        if (req.session && req.session.userLoggedId) {
            // Agarrar al usuario que está loggeado
            let userLogged = await db.User.findByPk(req.session.userLoggedId, {
                attributes: {
                    exclude: ['password']
                }
            });
            // Quiere decir que no completó sus datos
            if (!userLogged['first_name'].length || !userLogged['last_name'].length) {
                // Obtener la URL actual
                var pathToCheck = '';
                if (req.originalUrl) {
                    pathToCheck = getRelativePath(req.originalUrl);
                    console.log(pathToCheck);
                    // Verificar si el usuario se encuentra en una URL específica
                    if (pathToCheck != '/user/profile') {
                        // Lo redirijo para que complete sus datos
                        return res.redirect(`/user/profile?completeForm=${true}`);
                    }
                }
            }
        }
        return next();
    } catch (error) {
        console.log('Falle en userIsIncomplete: ' + error);
        return res.send(error);
    }
};

module.exports = userIsIncomplete