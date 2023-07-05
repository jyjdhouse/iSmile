const Blog = require('../database/models/Blog');
const Blog_Image = require('../database/models/BlogImage');
const showdown = require('showdown');


const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los blogs
        try {
            let blogs = await Blog.findAll()
            return res.render('blogList', {blogs})
        } catch (error) {
            console.log(`Falle en blogController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve blog en especifico
        try {
            const { blogId } = req.params
            let blog = await Blog.findByPk(blogId, {include: ['images']});
    
            return res.render('blog', {blog})
        } catch (error) {
            console.log(`Falle en apiBlogController.detail: ${error}`);
            return res.json(error);
        }
       
    },
    createBlog: (req, res) => {
        return res.render('createBlog')
    },
    processBlogCreation: async (req, res) => {
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
            
            const newBlog = await Blog.create(blogObject);
    
            const imagesObject = images.map(obj => {
                return {
                    image: obj.path,
                    blog_id: newBlog.id
                }
            });
    
            await Blog_Image.bulkCreate(imagesObject);
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
    update: async (req, res) => {
        try {
         
            const blogId = req.params.blogId;
            const blogToUpdate = await Blog.findByPk(blogId, { include: ['image'] });
            const images = req.file;
            const {name, price, description} = req.body;
    
            const blogUpdated = await Blog.update({
                name,
                price,
                description
            }, {
                where: {
                    id: blogToUpdate.id
                }
            });
    
            let imgsToDelete = [];
    
            const imgsToDeleteFilter = Blog.images.filter(image => { //FILTER TO DELETE IMAGES 
                if (!req.body.current_imgs.includes(image.image)) {
                    return imgsToDelete.push(image.image)
                }
            });
    
            if (imgsToDeleteFilter.length > 0) {
    
                imgsToDelete.forEach(image =>
                    fs.unlinkSync(path.join(__dirname, '../../public/img/blog' + image)) // DELETE IMGS IN LOCAL FOLDER    
                );
    
                await Blog_Image.destroy({
                    where: {
                        image: {
                            [Op.in]: imgsToDelete
                        }
                    },
                    force: true
                }); 
           
            }
    
            if (images) {
                let imagesObject = images.map(obj => {
                    return {
                        image: obj.path,
                        blog_id: blogId
                    }
                });
                await Blog_Image.bulkCreate(imagesObject);
            }
    
    
        return res.status(200).json({
            meta: {
                status: 200,
                msg: 'Blog actualizado Correctamente!'
            },
            blog: blogUpdated
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
    
             await Blog.destroy({
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
            console.log(`Falle en blogController.delete: ${error}`);
            return res.json(error);
         }
    }


}

module.exports = controller