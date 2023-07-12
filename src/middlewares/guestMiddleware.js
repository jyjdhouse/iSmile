const guestMiddleware = function (req,res,next) {
    // console.log(`guestMIDDLEWARE: ${req.session.userLoggedId}`);
    if(!req.session.userLoggedId){
        return res.redirect('/')
    }
    next();
};

module.exports=guestMiddleware;