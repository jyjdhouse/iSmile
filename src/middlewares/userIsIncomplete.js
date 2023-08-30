const db = require('../database/models');

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
            // Quiere decir que no verifico el mail
            if (!userLogged.verified_email) {           
                if (req.originalUrl) {
                    // Verificar si el usuario se encuentra en una URL específica
                    if (!req.originalUrl.includes('/user/verificar-email')) {
                        // console.log('El path es:' + pathToCheck);
                        // Lo redirijo para que complete sus datos
                        return res.redirect(`/user/verificar-email`);
                    }
                }
            }
           
            // Quiere decir que no completó sus datos
            else if (!userLogged.verified_essential_data) {
                if (!req.originalUrl.includes('/user/profile')) {
                    return res.redirect(`/user/profile?completeForm=true`);
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