// SDK 
const { body } = require("express-validator");
const mercadopago = require("mercadopago");
const controller = {
    createPreference: (req, res) => {
        // console.log(req.body);
        let bodyItems = req.body;
        let items = [];
        // Lo armo como pide items
        bodyItems.forEach(item => {
            const product = {
                title: item.description,
                unit_price: Number(item.price),
                quantity: Number(item.quantity),
                description: item.description
            };
            items.push(product);
        });
        // Agrega credenciales
        mercadopago.configure({//TODO: Cambiar despues por produccion
            access_token: "TEST-396512776617745-070214-41a3804e491dda397991f960c90b8140-389461868",
        });
        // Crea un objeto de preferencia
        let preference = {
            items,
            back_urls: {
                "success": "http://localhost:4500",
                "failure": "http://localhost:4500/user/checkout",
                "pending": "http://localhost:4500"
            },
            auto_return: "approved",

        };
        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json({
                    id: response.body.id
                });
            }).catch(function (error) {
                console.log(error);
            });

    }
};

module.exports = controller;
