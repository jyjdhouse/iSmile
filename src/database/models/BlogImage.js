module.exports = (sequelize, dataTypes) => {
    let alias = "BlogImage";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        filename: { type: dataTypes.STRING(255) },
        blog_id: { type: dataTypes.INTEGER },
        main_image: {type: dataTypes.INTEGER}
    }

    let config = {
        tableName: 'blogs_images',
        timestamps: false
    }

    const BlogImage = sequelize.define(alias, cols, config);

    BlogImage.associate = (models) => {
        BlogImage.belongsTo(models.Product, {
            as: 'blog',
            foreignKey: 'blog_id'
        });
    };
    return BlogImage;
}