const db = require('../../database/models');
// Librerias
const axios = require('axios');
const { validationResult } = require('express-validator');
// From utils
const paymentAccessKey = process.env.PAYMENT_API_KEY;
const handleStock = require('../../utils/handleStock');

const controller = {
    getPaymentRequest: async (req, res) => {
        try {

            let { items, date, name, last_name, payment_methods_id } = req.body;
            // Traigo los errores de formulario (si alguno vino vacio de los que no debia)
            let errors = validationResult(req);
            if (!errors.isEmpty()) { //Si hay errores...
                // No importa de que fue error, fue porque algo hicieron en el front ==> Repinto la vista
                // con mensaje de que hubo error
                console.log(errors);
                return res.status(404).json({
                    meta: {
                        status: 404
                    },
                    ok: false,
                    errors,
                    msg: 'Error al procesar la compra, intente nuevamente'
                });
            };
            // Me fijo si paga con transferencia ==> No resto nada (se hace cuando cambia el estado a pendiente de pago)
            if (payment_methods_id == 1) {
                // Le devuelvo un 200 para que siga con la solicitud
                return res.status(200).json({
                    meta: {
                        status: 200,
                    },
                    ok: true,
                });
            }

            let method;
            items = JSON.parse(items);
            // Antes de hacer el pedido del boton me fijo que todos los productos esten en stock
            // Lo armo asi para que la funcion lo lea
            let itemsToHandleStock = items.map(item => {
                return {
                    id: item.products_id,
                    quantity: item.quantity
                }
            });
            method = 'resta';
            let responseFromHandlingStock = await handleStock(itemsToHandleStock, method);
            // Si dio error es que hubo error con descontar el stock ==> devuelvo stock y no dejo que compre
            if (!responseFromHandlingStock.ok) {
                return res.status(400).json({
                    meta: {
                        status: 400,
                    },
                    ok: false,
                    message: 'La solicitud no se completó correctamente.',
                });
            }


            // Si no hay errores
            let productsInDB = getDeepCopy(await getAllProducts());

            let total = 0;
            let itemArrayToRequest = [];
            // Agarro el total
            items.forEach(item => {
                // Agarro el producto
                let itemInDB = productsInDB.find(prod => prod.id == item.products_id);
                total += parseFloat(itemInDB.price) * parseInt(item.quantity);
                // si tiene descuento el producto entonces le multiplico por el descuento
                if (itemInDB.discount) total = total * (1 - itemInDB.discount / 100);
                itemArrayToRequest.push({
                    quantity: parseInt(item.quantity),
                    description: itemInDB.description,
                    amount: total
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
                    excluded_channels: ['banelco_pmc', 'link_pagos', 'DEBIN', 'wire_transfer', 'non_banking']
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
                ok: true,
                url: response.checkout_url
            });
        } catch (error) {
            console.error('Error:', error);
        };
    }
};

module.exports = controller;
