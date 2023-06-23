const fetch = require('node-fetch');
const path = require('path')
const fs = require('fs');
const db = require('../database/models');
// Utils
const staticProducts = require('../utils/staticDB/products');

const controller = {
    index: async (req, res) => {
        try {
            // let loginErrors = req.query.loginErrors && JSON.parse(req.query.loginErrors);
            // let oldData = req.query.oldData && JSON.parse(req.query.oldData);
            // let productsForGallery = [];
            // let count = 0;
            // while (count < 6) { //Dejo 6 productos random
            //     let random = products[Math.floor(Math.random() * products.length)];
            //     if (!productsForGallery.includes(random)) {
            //         productsForGallery.push(random)
            //         count++;
            //     }
            // };
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
            let blog = await db.Blog.findAll({
                where:{
                    id: req.params.id
                },
               /*  include: ['keywords','colors'] */
            });
            return res.render('blog', blog)
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
    },
    showMedicalForm: (req,res) =>{
        return res.render('ClientMedicalInfo.ejs')
    },
    budget: (req,res) =>{
        // return res.send(staticProducts);
        return res.render('budget.ejs',{products:staticProducts})
    },
    consent: (req,res) =>{
        return res.render('clientConsent');
    },
    getTestingProducts :(req,res) =>{
        return res.status(200).json({
            meta: {
                msg:"productos traidos correctamente"
            },
            products: staticProducts
        })
    }
};

module.exports = controller;