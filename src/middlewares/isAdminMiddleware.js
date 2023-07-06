const getUser = require('../utils/getUser');

const isAdmin = async(req,res,next) =>{
    let userId = req.session.userLoggedId;
    let user = await getUser(userId);
    if(!user || (user.user_categories_id!=1 && user.user_categories_id!=2)){ //Si no es admin
        return res.redirect('/'); //Lo devuelvo a home
    }
    next();
}

module.exports = isAdmin; 