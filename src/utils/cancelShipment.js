const db = require("../database/models");

//Librerias
const { DOMParser } = require("xmldom");
const axios = require("axios");

// UTILS
const shipmentData = require("../utils/staticDB/shipmentData");


module.exports = async function (oca_orden_retiro) {
  try {
    const bodyData = {
      Usr: !process.env.ENVIROMENT
        ? process.env.OCA_USER
        : process.env.OCA_USER_TEST,
      Psw: !process.env.ENVIROMENT
        ? process.env.OCA_PASSWORD
        : process.env.OCA_PASSWORD_TEST,
      IdOrdenRetiro: oca_orden_retiro,
    };
    const cancelShipmentOrderResponse = await axios.post(
      shipmentData.shipmentCancelOrderUrl,
      bodyData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let xmlDoc;
    const parser = new DOMParser();
    xmlDoc = parser.parseFromString(
      cancelShipmentOrderResponse.data,
      "text/xml"
    );
    const cancelResponseCode = xmlDoc.getElementsByTagName("IdResult")[0]?.textContent;
    const cancelResponseMsg = xmlDoc.getElementsByTagName("Mensaje")[0]?.textContent;
    console.log(cancelResponseCode,cancelResponseMsg);
    
    
    return { code: cancelResponseCode, msg: cancelResponseMsg};
  } catch (error) {
    console.log(`Falle en cancelShipment: ${error}`);
    return {
      ok: false,
      error,
      msg: `No se pudo procesar el servicio con OCA. Reintentar`,
      orderId: order.tra_id,
    };
  }
};
