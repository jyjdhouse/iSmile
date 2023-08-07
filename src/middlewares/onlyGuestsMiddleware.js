const onlyGuestsMiddleware = function (req,res,next){
    // Si hay usuario loggeado entonces lo devuelvo a la home
    if(req.session.userLoggedId){
        return res.redirect('/')
    }
    next();
}


module.exports = onlyGuestsMiddleware