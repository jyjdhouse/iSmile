const secret = require('../utils/secret').secret;
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    let userId;
    //Agarro la cookie del token
    const token = req.cookies?.adminToken;
    if (token) {
        const decodedData = jwt.verify(token, secret);
        if (decodedData) { //Si verifico el token, solo agarro el id
            userId = decodedData?.id
        }
    };
    if (!userId) { //Si no es admin
        //Lo deslogueo
        res.clearCookie('userAccessToken');
        res.clearCookie('adminToken')
        req.session.destroy();
        return res.redirect('/')
    }
    next();
}

module.exports = isAdmin; 