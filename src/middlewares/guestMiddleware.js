const guestMiddleware = function (req,res,next) {
    if(!req.session.userLoggedId){
        return res.redirect('/')
    }
    next();
};

module.exports=guestMiddleware;