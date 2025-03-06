const getAllSpecialties = require('../utils/getAllSpecialties');

const headerMiddleware = async (req, res, next) => {
    try {
        const headerSpecialties = await getAllSpecialties();
        res.locals.headerSpecialties = headerSpecialties;
        next();
    } catch (error) {
        console.log('Falle en headerMiddleware: ' + error);
        return res.send(error)
    }
}

module.exports = headerMiddleware;