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
         author: { type: dataTypes.STRING(100) },
         createdAt: {
             type: dataTypes.DATE,
             defaultValue: () => Date.now()
         }
     }

     let config = {
         tableName: 'blogs',
         timestamps: false
     }

     const Blog = sequelize.define(alias, cols, config);

     Blog.associate = (models) => {
         Blog.hasMany(models.BlogImage, {
             as: 'files',
             foreignKey: 'blog_id'
         });
     };

     return Blog;
 }