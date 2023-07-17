const secret = require('../utils/secret').secret;
const jwt = require('jsonwebtoken');

const isAdmin = async(req,res,next) =>{
    let userId;
    //Agarro la cookie del token
    const token = req.cookies?.adminToken;
    if(token){
        const decodedData = jwt.verify(token, secret);
        if(decodedData){ //Si verifico el token, solo agarro el id
            userId = decodedData?.id
        }
    };
    if(!userId){ //Si no es admin
        return res.redirect('/user/logout'); //Lo deslogueo
    }
    next();
}

module.exports = isAdmin; 