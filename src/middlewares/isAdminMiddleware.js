const jwt = require('jsonwebtoken');
const webTokenSecret =  process.env.JSONWEBTOKEN_SECRET;

const isAdmin = async (req, res, next) => {
    let userId;
    //Agarro la cookie del token
    const token = req.cookies?.adminToken;
    if (token) {
        const decodedData = jwt.verify(token, webTokenSecret);
        if (decodedData) { //Si verifico el token, solo agarro el id
            userId = decodedData?.id
        }
    };
    if (!userId) { //Si no es admin
        //Lo deslogueo
        res.clearCookie('userAccessToken');
        res.clearCookie('adminToken')
        delete req.session.userLoggedId;
        return res.redirect('/')
    }
    next();
}

module.exports = isAdmin; 