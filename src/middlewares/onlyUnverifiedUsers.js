const getUser = require('../utils/getUser');

const onlyUnverifiedUsers = async function (req,res,next){
    // Si hay usuario loggeado 
    if(req.session.userLoggedId){
        // Agarro al usuario
        const user = await getUser(req.session.userLoggedId);
        // Solo si hay usuario y no esta verificado lo dejo seguir, sino lo vuelvo a la home
        if(!user.verified_email) return next();
    }
    return res.redirect('/');
};


module.exports = onlyUnverifiedUsers