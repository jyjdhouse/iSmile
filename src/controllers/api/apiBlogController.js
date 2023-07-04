

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
       
    }
    
};

module.exports = controller;
