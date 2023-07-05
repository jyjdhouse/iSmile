const db = require('../database/models/');

const showdown = require('showdown');


const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los blogs
        try {
            let blogs = await db.Blog.findAll()
            return res.render('blogList', {blogs})
        } catch (error) {
            console.log(`Falle en blogController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve blog en especifico
        try {
            const { blogId } = req.params
            let blog = await db.Blog.findByPk(blogId, {include: ['images']});
    
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
            let { title, text, mainImage, author } = req.body;
            const images = req.files;
            mainImage = images.find(img=>img.originalname == mainImage)
            
            const convertToMarkdown = () => { // este showdown es para convertir el html a markdown, y conservar el formato
                let converter = new showdown.Converter();
                let convertHtml = converter.makeHtml(text);
                return convertHtml
            };
    
            const blogObject =  {
                title,
                text: convertToMarkdown(),
                author,
                createdAt: Date.now()
            }
            
            const newBlog = await db.Blog.create(blogObject);
    
            let imagesObjectDB = images.map(img=>{
                const isMainImage = img == mainImage ? 1 : 0;
                return {
                    filename: img.filename,
                    blog_id: newBlog.id, //CREAR PRIMERO
                    main_image: isMainImage,
                }
            });
    
            await db.BlogImage.bulkCreate(imagesObjectDB);
            return res.render(`blog/${newBlog.id}`)
        } catch (error) {
            console.log(`Falle en blogController.creado: ${error}`);
            return res.json(error);
        }
    },
    update: async (req, res) => {
        try {
         
            const blogId = req.params.blogId;
            const blogToUpdate = await db.Blog.findByPk(blogId, { include: ['image'] });
            const images = req.file;
            const {name, price, description} = req.body;
    
            const blogUpdated = await db.Blog.update({
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
    
                await db.BlogImage.destroy({
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
                await db.BlogImage.bulkCreate(imagesObject);
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