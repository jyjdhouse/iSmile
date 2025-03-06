const db = require('../database/models');
module.exports = async function (id) {
    return await db.Blog.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            'files',       
        ]
    });
}