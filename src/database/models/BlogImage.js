module.exports = (sequelize, dataTypes) => {
    let alias = "BlogImage";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: { type: dataTypes.TEXT },
        blog_id: { type: dataTypes.INTEGER },
        main_image: {type: dataTypes.INTEGER},
        file_types_id: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'blogs_images',
        timestamps: false
    }

    const BlogImage = sequelize.define(alias, cols, config);

    BlogImage.associate = (models) => {
        BlogImage.belongsTo(models.Blog, {
            as: 'blog',
            foreignKey: 'blog_id'
        });
        BlogImage.belongsTo(models.FileType, {
            as: 'fileType',
            foreignKey: 'file_types_id'
        });
    };
    return BlogImage;
}