const db = require('../../database/models');
const showdown = require('showdown');

// From utils
const getProduct = require('../../utils/getProduct.js');
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllBlogs = require('../../utils/getAllBlogs');
const getBlog = require('../../utils/getBlog');


const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los blogs
        try {
            let blogs = await getAllBlogs();
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: blogs.length,
                    url: 'api/product'
                },
                count: blogs.length,
                blogs
            });
        } catch (error) {
            console.log(`Falle en apiBlogController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve blog en especifico
        try {
            const { blogId } = req.params
            let blog = await getBlog(blogId);
    
            return res.status(200).json({
                meta: {
                    status: 200,
                    url: `api/product/${id}`
                },
                blog
            });
        } catch (error) {
            console.log(`Falle en apiBlogController.detail: ${error}`);
            return res.json(error);
        }
       
    },
    createBlog: async (req, res) => {
        try {
            const { title, description } = req.body;
            const images = req.file;

            const convertToMarkdown = () => { // este showdown es para convertir el html a markdown, y conservar el formato
                let converter = new showdown.Converter();
                let convertHtml = converter.makeHtml(description);
                return convertHtml
            };

            const blogObject =  {
                title,
                description: convertToMarkdown()
            }
            
            const newBlog = await db.Blog.create(blogObject);

            const imagesObject = images.map(obj => {
                return {
                    image: obj.path,
                    product_id: newBlog.id
                }
            });

            await db.Blog_Image.bulkCreate(imagesObject);
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto creado satisfactoriamente'
                },
                blog: newBlog
            });
        } catch (error) {
            console.log(`Falle en blogController.creado: ${error}`);
            return res.json(error);
        }
    },

    //  TODO - UPDATE BLOG
    update: async (req, res) => {
        try {
         
            const productId = req.params.productId;
            const productToUpdate = await db.Device.findByPk(productId, { include: ['category'] })
            const {name, price, description} = req.body

            const productUpdated = await db.Device.update({
                name,
                price,
                description
            }, {
                where: {
                    id: productToUpdate.id
                }
            })


            return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto actualizado Correctamente!'
                },
                product: productUpdated
            });

        } catch (error) {
            console.log(`Falle en blogController.update: ${error}`);
            return res.json(error);
        }
    },
   
    deleteProduct: async (req, res) => {
        try {
            const blogId = req.params.blogId;

            const blog = await getBlog(blogId);
 
             await db.Blog.destroy({
                 where: {
                     id: blog.id
                 }
             }) 
             return res.status(200).json({
                meta: {
                    status: 200,
                    msg: 'Producto eliminado satisfactoriamente'
                },
                id: blogId
            });
         } catch (error) {
            console.log(`Falle en productController.delete: ${error}`);
            return res.json(error);
         }
    }
};

module.exports = controller;
