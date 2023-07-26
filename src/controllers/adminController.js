const db = require('../database/models');
const getAllTreatments = require('../utils/getAllTreatments');
const getDeepCopy = require('../utils/getDeepCopy');
const countryCodes = require('../utils/staticDB/countryCodes');
const provinces = require('../utils/staticDB/provinces');
const paymentMethods = require('../utils/staticDB/paymentMethods');
const orderStatus = require('../utils/staticDB/orderStatus');
const fs = require('fs')
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
        return res.render('updateServicePrice', { treatments });
    },
    processServicesPriceUpdating: async (req, res) => {
        // Array con valores numericos
        let treatmentsToUpdate = JSON.parse(req.body.treatments_id);
        // return res.send(treatmentsToUpdate); 
        // Me fijo cuales tienen foto para guardar la imagen
        let treatmentsWithFile = treatmentsToUpdate.filter(treat => treat.file);
        // Guardo las imagenes
        treatmentsWithFile && treatmentsWithFile.forEach(treat => {
            const imagenBuffer = Buffer.from(treat.file, 'base64');
            // Define la ruta donde se guardará la imagen
            const rutaImagen = `./testing.jpg`; //Desde la raiz del proyecto
            // Guarda la imagen en el sistema de archivos
            fs.writeFile(rutaImagen, imagenBuffer, (error) => {
                if (error) {
                    console.error('Error al guardar la imagen:', error);
                } else {
                    console.log('Imagen guardada exitosamente.');
                }
            });
        });
        return res.send(treatmentsWithFile);
        let price = req.body.new_price;
        let cashPrice = req.body.new_cash_price;
        // Aca ya tengo el objeto para hacer bulkUpdate
        treatmentsToUpdate = treatmentsToUpdate.map(treatId => {
            return {
                id: parseInt(treatId),
                price: parseInt(price),
                cash_price: parseInt(cashPrice)
            }
        });



        // return res.send(treatmentsToUpdate)

        // Una vez que hago esto con todos los servicios a modificar, hago el bulkUpdate
        await db.Treatment.bulkCreate(treatmentsToUpdate, {
            updateOnDuplicate: ["price", "cash_price"]
        });
        return res.redirect('/');
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
    }
};

module.exports = controller;