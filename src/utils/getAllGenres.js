const db = require('../database/models');
module.exports = async function (id) {
    return await db.Genre.findAll({});
}