const guestMiddleware = function (req,res,next) {
    console.log(req.session)
    if(!req.session.userLoggedId){ 
        return res.redirect('/user/regist')
    }
    next();
};

module.exports=guestMiddleware;