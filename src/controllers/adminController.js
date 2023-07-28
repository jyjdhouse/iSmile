const db = require('../database/models');

// Utils
const getAllTreatments = require('../utils/getAllTreatments');
const getDeepCopy = require('../utils/getDeepCopy');
const countryCodes = require('../utils/staticDB/countryCodes');
const provinces = require('../utils/staticDB/provinces');
const paymentMethods = require('../utils/staticDB/paymentMethods');
const orderStatus = require('../utils/staticDB/orderStatus');

// Libreries
const fs = require('fs')

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
        return res.render('updateServicePrice', { treatments });
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