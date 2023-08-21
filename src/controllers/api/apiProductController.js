const db = require('../../database/models');
const Sequelize = require('sequelize');

// // From utils
// const getProduct = require('../../utils/getProduct.js');
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllProducts = require('../../utils/getAllProducts');
const getAllTreatments = require('../../utils/getAllTreatments');

// AWS S3
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const sharp = require('sharp')

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

const controller = {
    list: async (req, res) => { //Metodo que devuelve todos los productos
        try {
            let {ids} = req.query;
            ids = ids.split(','); //Lo armo array para consultar en db
            let products;
            if(ids){ //Si viene por params ids, es que solo quiere un par
                products = getDeepCopy( await db.Product.findAll({
                    where: {
                        id:ids
                    },
                    include: [
                        {
                            association: 'files',
                            include: ['fileType']
                        },
                        'temporalItems',
                        'category'
                    ]
                }));
            } else{ //Sino busco todos
                products = getDeepCopy(await getAllProducts());
            };
            // No llevo al front datos innecesarios
            products = products.map(prod=>{
                return {
                    name: prod.name,
                    description: prod.description,
                    discount: prod.discount,
                    id: prod.id,
                    price: prod.price,
                    stock: prod.stock,
                    discount: prod.discount,
                    files: prod.files
                }
            })
            // Si la url es checkout entonces le pido las url a cada producto
            if (req.headers?.referer?.includes('checkout')) {

                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    if (product.files?.length) {
                        //Agarro la primer foto
                        let file = product.files.find(file => file.main_image == 1); //Agarro la primer mainImage
                        !file ? file = product.files.find(file => file.file_types_id == 1) : null;
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `product/${file.filename}`
                        }
                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min
                        product.file_url = url; //en el href product.files[x].file_url
                    }
                    delete product.files;
                    delete product.filename;
                    delete product.description;
                }
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/product'
                },
                count: products.length,
                products
            });
        } catch (error) {
            console.log(`Falle en apiProductController.list: ${error}`);
            return res.json(error);
        }
    },
    detail: async (req, res) => {//Metodo que devuelve producto en especifico
        const { id } = req.params
        let product = await getProduct(id);
        product = getDeepCopy(product);

        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/${id}`
            },
            product
        });
    },
    getCheckoutProducts: async(req, res) => {
        const productsArray = req.body;
        let arrayToReturn = []

        for (let item of productsArray) {
            let prod = await db.Product.findByPk(item);
            arrayToReturn.push(prod);
        }

        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/getCheckoutProducts`
            },
            arrayToReturn
        });

    },
    getTreatments: async (req, res) => {//Metodo que devuelve producto en especifico
        let treatments = await getAllTreatments();
        treatments = getDeepCopy(treatments);


        return res.status(200).json({
            meta: {
                status: 200,
                url: `api/product/getTreatments`
            },
            treatments
        });
    },
};

module.exports = controller;
