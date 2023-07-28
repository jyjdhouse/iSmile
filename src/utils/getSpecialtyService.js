const db = require('../database/models')
module.exports = async function (id) {
    return await db.SpecialtyService.findByPk(id, {
        include: ['treatments','specialty']
    });
}