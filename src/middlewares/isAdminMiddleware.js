const isAdmin = (req,res,next) =>{
    let user = req.session.userLogged;
    if(!user || !user.isAdmin){ //Si no es admin
        return res.redirect('/'); //Lo devuelvo a home
    }
    next();
}

module.exports = isAdmin; 