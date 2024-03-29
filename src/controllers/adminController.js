const db = require('../database/models');

// Utils
const getAllTreatments = require('../utils/getAllTreatments');
const getDeepCopy = require('../utils/getDeepCopy');
const countryCodes = require('../utils/staticDB/countryCodes');
const provinces = require('../utils/staticDB/provinces');
const paymentMethods = require('../utils/staticDB/paymentMethods');
const orderStatus = require('../utils/staticDB/orderStatus');
const specialtiesStatic = require('../utils/staticDB/services').specialties;
const specialtiesServicesStatic = require('../utils/staticDB/services').specialties_services;
const handleStock = require('../utils/handleStock');
// Libreries
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

// Utils


const orderByAlfabet = (array) => {
    return array.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1; // a debe estar antes que b
        }
        if (nameA > nameB) {
            return 1; // a debe estar después que b
        }
        return 0; // a y b son iguales
    });
}

const controller = {
    registerSale: async (req, res) => {
        const products = await db.Product.findAll()
        return res.render('registerSale', { products, paymentMethods, countryCodes, provinces })
    },
    updateServicesPrice: async (req, res) => {
        let treatments = getDeepCopy(await getAllTreatments());
        treatments = orderByAlfabet(treatments);
        let specialtiesServices = await db.SpecialtyService.findAll();
        return res.render('updateServicePrice', { treatments, specialties: specialtiesStatic, specialtiesServices: specialtiesServicesStatic });
    },
    addTreatment: async (req, res) => {
        try {
            let { treatment_name, treatment_description, specialty_id, specialtyService_id, application_time, duration, price, cash_price } = req.body;
            let file = req.file;
            let randomName, buffer;
            // Si viene imagen la creo
            if (file) {
                let fileType = file.mimetype.startsWith('video/') ? 2 : 1;
                if (fileType == 1) {//FOTO
                    // Creo el nombre unico para la foto (dentro del forEach)
                    randomName = 'treatment-' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                    // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                    //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    buffer = await sharp(file.buffer).toFormat('webp').toBuffer();
                    // El objeto de la imagen que voy a subir
                    const params = {
                        Bucket: bucketName,
                        Key: `treatment/${randomName}`,//Esto hace que se guarde en la carpeta treatment
                        Body: buffer,
                        ContentType: 'image/webp'
                    };
                    const command = new PutObjectCommand(params);
                    await s3.send(command);
                }

            }
            let treatmentToPushDB = {
                name: treatment_name,
                specialties_id: parseInt(specialty_id),
                specialties_services_id: specialtyService_id ? parseInt(specialtyService_id) : null,
                description: treatment_description,
                application_time,
                duration,
                price: parseInt(price),
                cash_price: parseInt(cash_price),
                filename: randomName
            };
            await db.Treatment.create(treatmentToPushDB);
            return res.redirect('/admin/servicios-modificar-precio');
        } catch (error) {
            console.log(`Falle en adminController.addTreatment: ${error}`);
            return res.json({ error })
        }
    },
    destroyTreatment: async (req, res) => {
        try {
            let { ids } = req.body;
            ids = JSON.parse(ids);
            // return res.send(ids);
            // Obtengo los tratamientos
            const treatmentsToDestroy = getDeepCopy(await db.Treatment.findAll({
                where: {
                    id: { [Op.in]: ids }
                }
            }));
            // Antes de hacer el destroy tengo que ver si tiene files para borrarlo de aws
            for (let i = 0; i < treatmentsToDestroy.length; i++) {
                const treatment = treatmentsToDestroy[i];
                if (treatment.filename) {
                    const params = {
                        Bucket: bucketName,
                        Key: `treatment/${treatment.filename}`
                    };
                    const command = new DeleteObjectCommand(params);
                    // Hago el delete de la base de datos
                    await s3.send(command);
                }
            };
            // Ahora si hago el destroy
            await db.Treatment.destroy({
                where: {
                    id: { [Op.in]: ids }
                }
            })
            return res.redirect('/admin/servicios-modificar-precio')
        } catch (error) {
            console.log(`Falle en adminController.addTreatment: ${error}`);
            return res.json({ error })
        }
    },
    showMedicalForm: (req, res) => {
        return res.render('ClientMedicalInfo.ejs')
    },
    budget: async (req, res) => {
        let treatments = await getAllTreatments();
        // return res.send(treatments);
        return res.render('budget.ejs', { products: treatments })
    },
    consent: (req, res) => {
        return res.render('clientConsent');
    },
    orderList: async (req, res) => {
        return res.render('orderList', { orderStatus })
    },
    destroyAllDiscounts: async (req, res) => {
        try {
            await db.Product.update({
                discount: 0
            }, {
                where: {}
            });
            return res.redirect('/');
        } catch (error) {
            console.log(`Falle en adminController.destroyAllDiscounts: ${error}`);
            return res.json({ error });
        }
    },
    updateHomeLabel: async (req, res) => {
        try {
            // Agarro la nueva etiqueta para hacer el update en DB
            let {newLabel} = req.body;
            // Se que es solo para la section 6 (CAMBIAR SI HAY OTRAS)
            await db.HomeFile.update({
                label: newLabel
            },{
                where: {
                    home_sections_id: 6
                }
            });
            return res.redirect('/');
        } catch (error) {
            console.log(`Falle en adminController.updateHomeLabel: ${error}`);
            return res.json({ error });
        }
    }

};

module.exports = controller;