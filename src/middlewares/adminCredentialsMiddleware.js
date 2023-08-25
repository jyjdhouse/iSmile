const webTokenSecret =  process.env.JSONWEBTOKEN_SECRET;
const jwt = require('jsonwebtoken');

const adminCredentialsMiddleware = async (req, res, next) => {
    try {
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
            return res.status(403).json({});
        }
        next();
    } catch (error) {
        return res.status(404).json({error});
    }
}

module.exports = adminCredentialsMiddleware; 