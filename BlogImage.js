// module.exports = (sequelize, dataTypes) => {
//     let alias = "Blog_Image";

//     let cols = {
//         id: {
//             type: dataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         image: { type: dataTypes.STRING(255) },
//         blog_id: { type: dataTypes.INTEGER }
//     }

//     let config = {
//         tableName: 'product_image',
//         paranoid: true
//     }

//     const Blog_Image = sequelize.define(alias, cols, config);

//     Blog_Image.associate = (models) => {
//         Blog_Image.belongsTo(models.Blog, {
//             as: 'blog',
//             foreignKey: 'blog_id'
//         });
//     };
//     return Blog_Image;
// }