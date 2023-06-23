
/* const Service = require('../database/models/Service') */
// Utils

const controller = {
    index: async (req, res) => {
        try {    
            return res.render('index')
        } catch (error) {
            console.log(`Falle en mainController.list: ${error}`);
            return res.send(error);
        }
    },
    services: async(req,res)=>{
        try {
            return res.render('services')
        } catch (error) {
            console.log(`Falle en mainController.services: ${error}`);
            return res.json({error})
        }
    },
    serviceDetail: async(req,res)=>{
        try {
            // A FUTURO
           /*  let service = await db.User.findByPk(req.params.serviceId); */
    
            return res.render('serviceDetail', /* {service} */)
        } catch (error) {
            console.log(`Falle en mainController.serviceDetail: ${error}`);
            return res.json({error})
        }
    },
    blogList: async(req,res)=>{
        try {
            return res.render('blogList')
        } catch (error) {
            console.log(`Falle en mainController.blogList: ${error}`);
            return res.json({error})
        }
    },
    blog: async(req,res)=>{
        try {
            /* let blog = await db.Blog.findAll({
                where:{
                    id: req.params.id
                },
               /*  include: ['keywords','colors']
            }); */
            return res.render('blog',/*  blog */)
        } catch (error) {
            console.log(`Falle en mainController.blog: ${error}`);
            return res.json({error})
        }
    },
    frequentQAndA: async(req,res)=>{
        try {
            return res.render('frequentQAndA')
        } catch (error) {
            console.log(`Falle en mainController.frequentQAndA: ${error}`);
            return res.json({error})
        }
    }
};

module.exports = controller;