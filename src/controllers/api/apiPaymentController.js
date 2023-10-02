const db = require("../../database/models");

// Librerias
const { validationResult } = require("express-validator");

// From utils
const handleStock = require("../../utils/handleStock");
const provinces = require("../../utils/staticDB/provinces");
const getDoubleNumber = require("../../utils/getDoubleNumber");
const sendOrderMails = require("../../utils/sendOrderMails");
const acceptedCards = require("../../utils/staticDB/acceptedCards");

// SDK IMPORT MODULES
const sdkModule = require("../../../lib/sdk");
const paymentMod = require("../../../lib/payment");
const PaymentDataModule = require("../../../lib/payment_data");


var ambient = "developer"; //valores posibles: "developer" o "production";
var sdk = new sdkModule.sdk(ambient, publicKey, privateKey);

// KEYS
var publicKey = process.env.PAYMENT_PUBLIC_KEY;
var privateKey = process.env.PAYMENT_API_KEY;
const controller = {
  getPaymentRequest: async (req, res) => {
    try {
      let { token, bin, order_tra_id, device_unique_identifier, card_id, payment_methods_id } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors = errors.mapped();
        console.log(errors);
      }
      

      //Busco la orden
      let orderToPay = await db.Order.findOne({
        where: {
          tra_id: order_tra_id,
        },
        include: ["billingAddress", "shippingAddress", "orderItems"],
      });
      // return res.status(200).json({
      //   orderToPay
      // });
      // si no la encuentro o la orden no tiene estado de pendiente de pago devuelvo un 404
      if (!orderToPay || orderToPay.order_status_id != 3) {
        return res.status(404).json({});
      }

      // Defino las variables de la provincia
      let billingProvinceCode = provinces.find(
        (prov) => prov.id == orderToPay.billingAddress.provinces_id
      ).CSCode;

      //amount es tipo long ==> algo que vale $1000 es 100000 porque quedaria 1000,00
      let args = {
        site_transaction_id: order_tra_id, //tra_id de la transaccion
        token,
        payment_method_id: parseInt(card_id), //tipo de tarjeta que uso
        bin, //Primeros digitos de la tarjeta
        amount: orderToPay.total * 100, 
        currency: "ARS",
        installments: 1, //Cuotas
        description: "Compra Online",
        payment_type: "single",
        sub_payments: [],
        establishment_name: "I Smile",
        "Content-Type": "application/json",
        apiKey: privateKey,
      };
      var customer = {
        id: orderToPay.billing_name,
        email: orderToPay.billing_email,
      };
      var paymentData = new PaymentDataModule.paymentData(args);
      console.log(args.amount);
      paymentData.setCustomer(customer);
      args = paymentData.getJSON();
      // send_to_cs = TRUE O FALSE PARA ENVIAR PARAMETROS CS
      var send_to_cs = true;

      if (send_to_cs == true) {
        let shipToData = {
          //Direccion de envio
          country: "AR",
          email: orderToPay.billing_email, //Mismo que facturacion
          first_name: orderToPay.billing_name, //Mismo que facturacion
          last_name: orderToPay.billing_name, //Mismo que facturacion
          phone_number: orderToPay.billing_phone, //Mismo que facturacion
        };
        if (orderToPay.shippingAddress) {
          //Si tiene direccion de entrega, le agrego a shipTo los datos del shippingAddress
          // Busco el codigo de provincia de esa direccion
          const shippingProvinceCode = provinces.find(
            (prov) => prov.id == orderToPay.shippingAddress.provinces_id
          ).CSCode;

          shipToData.city = orderToPay.shippingAddress.city;
          shipToData.postal_code = orderToPay.shippingAddress.zip_code;
          shipToData.state = shippingProvinceCode;
          shipToData.street1 = orderToPay.shippingAddress.street;
          shipToData.street2 = orderToPay.shippingAddress.apartment
            ? orderToPay.shippingAddress.apartment
            : "";
        } else if (orderToPay.order_types_id == 2) {
          //Retiro por el local
          shipToData.city = "CABA";
          shipToData.postal_code = "1425";
          shipToData.state = "C";
          shipToData.street1 = "Avenida Santa Fe 2911";
          shipToData.street2 = "Piso 3, departamento 'F' ";
        } else {
          // Envio a la direccion de facturacion
          shipToData.city = orderToPay.billingAddress.city;
          shipToData.postal_code = orderToPay.billingAddress.zip_code;
          shipToData.state = billingProvinceCode;
          shipToData.street1 = orderToPay.billingAddress.street;
          shipToData.street2 = orderToPay.billingAddress.apartment
            ? orderToPay.billingAddress.apartment
            : "";
        }
        //CyberSource
        var datos_cs = {
          send_to_cs: true,
          device_unique_identifier,
          channel: "Web",
          bill_to: {
            //Direccion de facturacion
            city: orderToPay.billingAddress.city,
            country: "AR",
            customer_id: orderToPay.billing_name,
            email: orderToPay.billing_email,
            first_name: orderToPay.billing_name,
            last_name: orderToPay.billing_name,
            phone_number: orderToPay.billing_phone,
            postal_code: orderToPay.billingAddress.zip_code,
            state: billingProvinceCode,
            street1: orderToPay.billingAddress.street, //Calle y numero
            street2: orderToPay.billingAddress.apartment
              ? orderToPay.billingAddress.apartment
              : "", //Detalle - opcional
          },
          purchase_totals: {
            currency: "ARS",
            amount: orderToPay.total * 100,
          },
          retail_transaction_data: {
            ship_to: shipToData,
          },
        };
        args.data.fraud_detection = datos_cs;
        // Hago el forEach de los orderItems
        let transactionItems = [];
        orderToPay.orderItems.forEach((item) => {
          let itemToPush = {
            code: item.products_id,
            description: "desc1",
            name: item.name,
            sku: "sku1",
            quantity: item.quantity,
            unit_price: item.price * (1 - (item.discount || 0) / 100), //Contempla el descuento
          };
          itemToPush.total_amount = itemToPush.quantity * itemToPush.unit_price;
          transactionItems.push(itemToPush);
        });
        // Lo agrego al objeto para le cs
        datos_cs.retail_transaction_data.items = transactionItems;
      }
      var instPayment = await new paymentMod.payment(sdk, args);
      if (typeof instPayment == "string" || instPayment?.status != "approved") {
        //Hay errores --> Devuelvo un 400
        console.log(err, instPayment);
        return res.status(400).json({
          meta: {
            status: 400,
          },
          ok: false,
          response: instPayment,
          items: datos_cs.retail_transaction_data.items,
          error: err,
          redirect: "/user/checkout?checkoutErrors=true",
        });
      }
      // Aca no hubo errores, doy por finalizada la compra.

      //Borro de la session el tra_id
      delete req.session.order_tra_id;

      //Borro el carro si habia usuario loggeado
      if (req.session.userLoggedId) {
        // Si se proceso el pago entonces limpio el carro del usuario
        await db.TemporalCart.destroy({
          where: {
            users_id: req.session.userLoggedId,
          },
        });
        // Tambien reinicio los mails del carro por si vuelve a meter cosas
        await db.User.update(
          {
            last_cart_email: null,
            cart_period_type: null,
          },
          {
            where: {
              id: req.session.userLoggedId,
            },
          }
        );
      }
      // Cambio el status de la orden
      // Esto es para agregar detalle del pago
      let cardUsed = acceptedCards.find(card=>card.decidir_id == card_id);
      let details = `${cardUsed?.name} **0015`; //TODO: Capturar ultimos 4 digitos
      await db.Order.update(
        {
          order_status_id: orderToPay.order_types_id == 1 ? 2 : 6, //pendiente de retiro o  de envio
          payment_methods_id,
          details
        },
        {
          where: {
            id: orderToPay.id,
          },
        }
      );
      // Mando el mail de confirmacion de compra
      // Tengo que armar 2 mails: 1 al que compro y otro a las chicas.
      await sendOrderMails(orderToPay);
      return res.status(200).json({
        meta: {
          status: 200,
        },
        ok: true,
        paymentResponse: instPayment,
        redirect: `/compra-exitosa/${order_tra_id}`,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(404).json({ error });
    }
  },
  handlePaymentError: async (req, res) => {
    try {
      let { order_tra_id } = req.body;
      let method = "suma";
      let stockItems = [];

      //Busco la orden
      let orderToPay = await db.Order.findOne({
        where: {
          tra_id: order_tra_id,
        },
        include: ["orderItems"],
      });
      orderToPay.orderItems.forEach((item) => {
        stockItems.push({
          id: item.products_id,
          quantity: item.quantity,
        });
      });
      // Sumo los items nuevamente al stock
      let stockResponse = await handleStock(stockItems, method);
      console.log(stockResponse);
      // Modifico el status de la orden (Pago rechazado)
      await db.Order.update(
        {
          order_status_id: 7,
        },
        {
          where: {
            id: orderToPay.id,
          },
        }
      );
      return res.status(200).json({
        meta: {
          status: 200,
        },
        ok: true,
      });
    } catch (error) {
      console.log(`Falle en apiPaymentController.handlePaymentError: ${error}`);
      return res.json({ error });
    }
  },
};

module.exports = controller;
