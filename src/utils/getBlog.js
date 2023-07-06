const db = require('../database/models');
module.exports = async function (id) {
    return await db.Blog.findByPk(id,{
        include: [
            'images',       
        ]
    });
}