const db = require('../database/models');
module.exports = async function () {
    return await db.Treatment.findAll({
        include: ['specialty','specialtyService']
    });
}