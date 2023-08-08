const db = require('../../database/models');
// Librerias
const axios = require('axios');
const { validationResult } = require('express-validator');
// From utils
const paymentAccessKey = process.env.PAYMENT_API_KEY;

const controller = {
    getPaymentRequest: async (req, res) => {
        try {
            let { items, date, name, last_name} = req.body;
            // Traigo los errores de formulario (si alguno vino vacio de los que no debia)
            let errors = validationResult(req);
            if (!errors.isEmpty()) { //Si hay errores...
                // No importa de que fue error, fue porque algo hicieron en el front ==> Repinto la vista
                // con mensaje de que hubo error
                return res.status(404).json({
                    meta: {
                        status: 404
                    },
                    ok:false,
                    errors,
                    msg: 'Error al procesar la compra, intente nuevamente'
                });
            }

            // Si no hay errores
            let productsInDB = getDeepCopy(await getAllProducts());
            items = JSON.parse(items);
            let total = 0;
            let itemArrayToRequest = [];
            // Agarro el total
            items.forEach(item => {
                // Agarro el producto
                let itemInDB = productsInDB.find(prod => prod.id == item.products_id);
                total += parseFloat(itemInDB.price) * parseInt(item.quantity);
                itemArrayToRequest.push({
                    quantity: parseInt(item.quantity),
                    description: itemInDB.description,
                    amount: parseFloat(itemInDB.price) * parseInt(item.quantity)
                })
            });
            const apiUrl = 'https://api.pagos360.com/payment-request';

            const paymentRequestData = {
                payment_request: {
                    description: 'Pago por productos. Venta E-Commerce.',
                    first_due_date: '27-01-2022',
                    first_total: total,
                    payer_name: `${name} ${last_name}`,
                    //Solo tarjetas
                    excluded_channels: ['banelco_pmc', 'link_pagos' , 'DEBIN', 'wire_transfer', 'non_banking']
                }
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${paymentAccessKey}`
            };

            let response = await axios.post(apiUrl, paymentRequestData, { headers });
            return res.status(200).json({
                meta: {
                    status: 200,
                },
                ok:true,
                url: response.checkout_url
            })
        } catch (error) {
            console.error('Error:', error);
        };
    }
};

module.exports = controller;
