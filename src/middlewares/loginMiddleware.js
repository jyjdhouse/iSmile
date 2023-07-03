const loginErrorsMiddleware = (req,res,next) =>{
    let loginErrors = req.query.loginErrors && JSON.parse(req.query.loginErrors);
    let registErrors = req.query.registErrors && JSON.parse(req.query.registErrors);
    if(loginErrors){
        res.locals.loginErrors = true;
        res.locals.errors = true;
    } else if(registErrors){
        res.locals.registErrors = {
            msg: registErrors.msg
        };
        res.locals.errors = true;
        console.log(res.locals);
    }
    next()
}


module.exports = loginErrorsMiddleware; 