const db = require('../database/models');
module.exports = async function () {
    return await db.Color.findAll();
}