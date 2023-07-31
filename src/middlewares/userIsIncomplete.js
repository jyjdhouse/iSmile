const db = require('../database/models');
const jwt = require('jsonwebtoken');
const getRelativePath = require('../utils/getRelativePath');
const secret = require('../utils/secret').secret;

// Este middleware chequea si los datos necesarios del cliente estan completos
const userIsIncomplete = async (req, res, next) => {
    try {
        // Obtener la URL actual
        // Si esta loggeado..
        if (req.session && req.session.userLoggedId) {
            // Agarrar al usuario que está loggeado
            let userLogged = await db.User.findByPk(req.session.userLoggedId, {
                attributes: {
                    exclude: ['password']
                }
            });
            // Quiere decir que no completó sus datos
            if (!userLogged['first_name'].length || !userLogged['last_name'].length) {
                
                if (req.originalUrl) {
                    // Verificar si el usuario se encuentra en una URL específica
                    if (!req.originalUrl.includes('/user/profile')) {
                        // console.log('El path es:' + pathToCheck);
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