const getRelativePath = require("../utils/getRelativePath");

const getLastURL = (req,res,next)=> {
    req.session.returnTo = getRelativePath(req.headers.referer); // Almacena la última URL en la sesión
    next();
}
module.exports = getLastURL
      