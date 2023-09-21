const db = require("../../database/models");
// Librerias
const axios = require("axios");
const { validationResult } = require("express-validator");
// From utils
const handleStock = require("../../utils/handleStock");
const provinces = require("../../utils/staticDB/provinces");
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
      let { token, bin, order_tra_id, device_unique_identifier, card_id } = req.body;

      //Busco la orden
      let orderToPay = await db.Order.findOne({
        where: {
          tra_id: order_tra_id,
        },
        include: ["billingAddress", "shippingAddress",'orderItems'],
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
        payment_method_id: 1, //tipo de tarjeta que uso
        bin, //Primeros digitos de la tarjeta
        amount: orderToPay.total,
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
        id: "juanpepito",
        email: orderToPay.billing_email,
      };
      var paymentData = new PaymentDataModule.paymentData(args);
      paymentData.setCustomer(customer);
      args = paymentData.getJSON();
      // send_to_cs = TRUE O FALSE PARA ENVIAR PARAMETROS CS
      var send_to_cs = true;

      if (send_to_cs == true) {
        let shipToData = { //Direccion de envio
          country: "AR",
          email: orderToPay.billing_email, //Mismo que facturacion
          first_name: orderToPay.billing_name, //Mismo que facturacion
          last_name: orderToPay.billing_name, //Mismo que facturacion
          phone_number: orderToPay.billing_phone, //Mismo que facturacion
        };
        if (orderToPay.shippingAddress) { //Si tiene direccion de entrega, le agrego a shipTo los datos del shippingAddress
          // Busco el codigo de provincia de esa direccion
          const shippingProvinceCode = provinces.find(
            (prov) => prov.id == orderToPay.shippingAddress.provinces_id
          ).CSCode;

          shipToData.city = orderToPay.shippingAddress.city;
          shipToData.postal_code = orderToPay.shippingAddress.zip_code;
          shipToData.state = shippingProvinceCode;
          shipToData.street1 = orderToPay.shippingAddress.street;
          shipToData.street2 = orderToPay.shippingAddress.apartment ? orderToPay.shippingAddress.apartment
          : "";
        } else if (orderToPay.order_types_id == 2){ //Retiro por el local
          shipToData.city = "CABA";
          shipToData.postal_code = '1425';
          shipToData.state = 'C';
          shipToData.street1 = "Avenida Santa Fe 2911";
          shipToData.street2 = "Piso 3, departamento 'F' "
        } else { // Envio a la direccion de facturacion
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
            customer_id: "juanpepito",
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
            amount: orderToPay.total,
          },
          retail_transaction_data: {
            ship_to: shipToData,
            items: [ //TODO: Hacer for-each de los productos
              {
                code: "item1",
                description: "desc1",
                name: "name1",
                sku: "sku1",
                quantity: 2,
                unit_price: 500,
                total_amount: 1000,
              },
            ],
          },
        };
        args.data.fraud_detection = datos_cs;
      }
      var instPayment = await new paymentMod.payment(sdk, args);
      if (typeof instPayment == "string") {
        //Hay errores --> Devuelvo un 400
        console.log(err);
        return res.status(400).json({
          meta: {
            status: 400,
          },
          ok: false,
          error: instPayment,
        });
      }
      return res.status(200).json({
        meta: {
          status: 200,
        },
        ok: true,
        paymentResponse: instPayment,
        redirect: `/compra-exitosa/${order_tra_id}`,
      });

      // sdk.payment(args, function (result, err) {
      //   console.log("");
      //   console.log(
      //     "Se realiza una petición de pago enviando el payload y el token de pago "
      //   );
      //   console.log("generado anteriormente");
      //   console.log("             PAYMENT REQUEST             ");
      //   console.log("sendPaymentRequest result:");
      //   console.log(result);
      //   console.log("sendPaymentRequest error:");
      //   console.log(err);
      //   return res.status(200).json({
      //     meta: {
      //       status: 200,
      //     },
      //     ok: true,
      //     paymentResponse: result,
      //   });
      // });
    } catch (error) {
      console.error("Error:", error);
      return res.status(404).json({ error });
    }
  },
};

module.exports = controller;
