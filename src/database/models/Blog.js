 module.exports = (sequelize, dataTypes) => {
     let alias = "Blog";

     let cols = {
         id: {
             type: dataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true
         },
         title: { type: dataTypes.STRING(255) },
         text: { type: dataTypes.TEXT },
         createdAt: {
             type: dataTypes.DATE,
             defaultValue: () => Date.now()
         }
     }

     let config = {
         tableName: 'blogs',
         paranoid: true
     }

     const Blog = sequelize.define(alias, cols, config);

     Blog.associate = (models) => {
         Blog.hasMany(models.Blog_Image, {
             as: 'images',
             foreignKey: 'blog_id'
         });
     };

     return Blog;
 }