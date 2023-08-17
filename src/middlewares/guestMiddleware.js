const guestMiddleware = function (req,res,next) {
    if(!req.session.userLoggedId){ 
        return res.redirect('/user/regist')
    }
    next();
};

module.exports=guestMiddleware;