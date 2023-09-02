module.exports = function (req,res,next) {
    // ENVIO EL TOKEN A LA VISTA
    res.locals.csrfToken = req.csrfToken();
    next();
};