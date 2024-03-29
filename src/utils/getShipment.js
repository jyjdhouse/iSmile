const db = require("../database/models");

//Librerias
const { DOMParser } = require("xmldom");
const axios = require("axios");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
// UTILS
const dbProvinces = require("../utils/staticDB/provinces");
const dbBoxSizes = require("../utils/staticDB/boxSizes");
const dateFormater = require("../utils/dateFormater");
const shipmentData = require("../utils/staticDB/shipmentData");
const sendShippingOrderMail = require("./sendShippingOrderMail");
const getDeepCopy = require("./getDeepCopy");
const getNextValidDay = require("./getNextValidDay");
// AWS S3
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// FRANJA HORARIAS
// 1 (8hs-17hs) || 2 (8hs-12hs) || 3 (14hs-17hs)
async function convertBase64ToPDF(base64String, tra_id) {
  try {
    // Decodificar la cadena Base64 en un ArrayBuffer
    const pdfBuffer = Buffer.from(base64String, "base64");
    // El objeto del pdf que voy a subir
    const params = {
      Bucket: bucketName,
      Key: `shippingTags/${tra_id}.pdf`,
      Body: pdfBuffer,
      ContentType: "application/pdf",
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log(`El PDF se ha guardado en AWS`);
    return {
      ok: true,
      status: 200,
    };
  } catch (error) {
    console.log(`Falle en convertBase64ToPDF: ${error}`);
    return {
      ok: true,
      status: 400,
    };
  }
}
// FECHA formato YYYYMMDD
function buildXml(data) {
  const accountNumber = !process.env.ENVIROMENT
    ? process.env.OCA_ACCOUNT_NUMBER
    : process.env.OCA_ACCOUNT_NUMBER_TEST;
  const xml = `<?xml version="1.0" encoding="iso-8859-1" standalone="yes"?>
<ROWS>
 <cabecera ver="2.0" nrocuenta="${accountNumber}" />
 <origenes>
 <origen calle="SANTA FE" nro="2911" piso="3" depto="F" cp="1425"
 localidad="CAPITAL FEDERAL" provincia="CAPITAL FEDERAL" contacto=""
 email="info@ismile.com.ar" solicitante="" observaciones="" centrocosto="18"
 idfranjahoraria="3" idcentroimposicionorigen="0" fecha="${data.date}">
 <envios>
 <envio idoperativa="${
   shipmentData.shipmentStaticInfo.Operativa.PaP
 }" nroremito="${data.user_dni}">
 <destinatario apellido="${data.last_name}" nombre="${
    data.first_name
  }" calle="${data.street}" nro="${data.street_number}"
 piso="" depto="${data.apartment || ""}" localidad="${data.city}" provincia="${
    data.province
  }"
 cp="${data.zip}" telefono="" email="${data.email}" idci="0"
 celular="${data.phone}" observaciones="" />
 <paquetes>
 <paquete alto="${data.boxesUsed.sizes[0]}" ancho="${
    data.boxesUsed.sizes[1]
  }" largo="${data.boxesUsed.sizes[2]}" peso="${
    data.orderWeight
  }" valor="0" cant="${data.boxesUsed.boxQuantityTotal}" />
 </paquetes>
 </envio>
 </envios>
 </origen>
 </origenes>
</ROWS>`;
  return xml;
}
module.exports = async function (orderId, boxesUsed) {
  let order;
  try {
    order = getDeepCopy(
      await db.Order.findOne({
        where: { tra_id: orderId },
        include: ["shippingAddress", "billingAddress", "orderItems"],
      })
    );
    // Para la fecha YYYYMMDD TODO: ver tema de si la fecha ya paso
    const validDay = getNextValidDay(new Date(order.date)); //Obtengo el dia habil mas cercano a la fecha de la orden
    const orderDateArray = dateFormater(validDay, true).split("/");
    const orderDate = `${orderDateArray[2]}${orderDateArray[1]}${orderDateArray[0]}`;

    // Me fijo el peso
    let orderWeight = 0;
    let idsToCheck = []; //Array de items para consultar en db
    order.orderItems.forEach((item) => {
      idsToCheck.push(item.products_id);
    });
    // Ahora consulto por esos productos en db
    const productsToCheck = await db.Product.findAll({
      where: {
        id: idsToCheck,
      },
    });
    productsToCheck.forEach((prod) => {
      const productQuantity = order.orderItems.find(
        (item) => item.products_id == prod.id
      ).quantity;
      orderWeight += parseFloat(prod.weight || 0) * productQuantity;
    });
    // Armo el objeto para pasar a la funcion que arma el xml
    let xmlData = {
      user_dni: order.billing_id,
      last_name: order.billing_first_name,
      first_name: order.billing_last_name,
      email: order.billing_email,
      phone: order.billing_phone,
      date: orderDate,
      boxesUsed,
      orderWeight,
    };

    // Me fijo que direccion de envio uso
    if (order.is_same_address) {
      //Uso la de billingAddress
      const xmlProvince = dbProvinces.find(
        (prov) => prov.id == order.billingAddress.provinces_id
      );
      xmlData = {
        ...xmlData,
        street: order.billingAddress.street,
        street_number: order.billingAddress.street_number,
        apartment: order.billingAddress.apartment,
        city: order.billingAddress.city,
        province: xmlProvince.name,
        zip: order.billingAddress.zip_code,
      };
    } else {
      //Uso la de shippingAddress
      const xmlProvince = dbProvinces.find(
        (prov) => prov.id == order.shippingAddress?.provinces_id
      );
      xmlData = {
        ...xmlData,
        street: order.shippingAddress.street,
        street_number: order.shippingAddress.street_number,
        apartment: order.shippingAddress?.apartment,
        city: order.shippingAddress?.city,
        province: xmlProvince?.name,
        zip: order.shippingAddress?.zip_code,
      };
    }
    // Crear un analizador DOM
    const parser = new DOMParser();

    let xmlBuilt = buildXml(xmlData);
    let bodyData = {
      Usr: !process.env.ENVIROMENT
        ? process.env.OCA_USER
        : process.env.OCA_USER_TEST,
      Psw: !process.env.ENVIROMENT
        ? process.env.OCA_PASSWORD
        : process.env.OCA_PASSWORD_TEST,
      XML_Datos: xmlBuilt,
      ConfirmarRetiro: true,
      ArchivoCliente: "",
      ArchivoProceso: "",
    };
    const generateShipmentOrderResponse = await axios.post(
      shipmentData.shipmentGenerateOrderUrl,
      bodyData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let xmlDoc;
    xmlDoc = parser.parseFromString(
      generateShipmentOrderResponse.data,
      "text/xml"
    );
    const ordenRetiroElement = xmlDoc.getElementsByTagName("OrdenRetiro")[0];
    const numeroEnvioElement = xmlDoc.getElementsByTagName("NumeroEnvio")[0];

    const ordenRetiro = ordenRetiroElement
      ? ordenRetiroElement.textContent
      : null;
    const numeroEnvio = numeroEnvioElement
      ? numeroEnvioElement.textContent
      : null;

    if (!ordenRetiro || !numeroEnvio) {
      //Devuelvo error
      return {
        ok: false,
        msg: `No se pudo procesar el servicio con OCA. Reintentar`,
        orderId: order.tra_id,
      };
    }
    
    // Esto es para usarlo en el mail
    order.oca_numero_envio = numeroEnvio;
    // Armo el bodyData para el nuevo fetch
    bodyData = {
      IdOrdenRetiro: ordenRetiro,
      NroEnvio: numeroEnvio,
      LogisticaInversa: false,
    };
    const getTagResponse = await axios.post(
      shipmentData.generateTagUrl,
      bodyData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    //la respuesta para la etiqueta es un pdf que viene en base64 en formato xml
    // Analizar el XML
    xmlDoc = parser.parseFromString(getTagResponse.data, "text/xml");
    // Obtener el valor de la etiqueta <string>
    const stringTag = xmlDoc.getElementsByTagName("string")[0];
    const base64String = stringTag?.firstChild?.nodeValue;

    if (!base64String) {
      //Si no capturo el base64String, entonces la respuesta fue erronea
      return {
        ok: false,
        msg: `No se pudo procesar el servicio con OCA. Reintentar`,
        orderId: order.tra_id,
      };
    }
    const pdfConverterResponse = await convertBase64ToPDF(
      base64String,
      order.tra_id
    );
    if (!pdfConverterResponse.ok) {
      return {
        ok: false,
        error,
        msg: `No se pudo procesar el servicio con OCA. Reintentar`,
        orderId: order.tra_id,
      };
    }
    // Ahora hago la peticion para saber el coste
    // Convertir las medidas de cm a metros
    const sizesInMts = boxesUsed.sizes.map((size) => size / 100);
    let totalVolume = sizesInMts[0] * sizesInMts[1] * sizesInMts[2];
    bodyData = {
      CUIT: process.env.ENVIROMENT ? process.env.CUIT_TEST : process.env.CUIT,
      Operativa: shipmentData.shipmentStaticInfo.Operativa.PaP,
      PesoTotal: xmlData.orderWeight, 
      VolumenTotal: totalVolume, 
      CodigoPostalOrigen: shipmentData.shipmentStaticInfo.CodigoPostalOrigen, 
      CodigoPostalDestino: parseInt(xmlData.zip),
      CantidadPaquetes: boxesUsed.boxQuantityTotal,
      ValorDeclarado: order.total,
    };
    const response = await axios.post(
      shipmentData.shipmentEstimateUrl,
      bodyData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    xmlDoc = parser.parseFromString(response.data, "text/xml");
    const totalValue = xmlDoc.getElementsByTagName("Total")[0]?.textContent;
    if (!totalValue) {
      console.log(`Falle en el pedido para calcular el total: ${error}`);
      return res.json({
        ok: false,
        msg: `Hubo un error al calcular coste de envio.`,
      });
    }
    // Lo pego aca para
    order.shipping_cost = parseFloat(totalValue).toFixed(2);
    await sendShippingOrderMail(order);
    await db.Order.update(
      {
        oca_numero_envio: numeroEnvio,
        oca_orden_retiro: ordenRetiro,
      },
      {
        where: {
          id: order.id,
        },
      }
    );
    return {
      ok: true,
      numero_envio: numeroEnvio,
      orden_retiro: ordenRetiro,
    };
  } catch (error) {
    console.log(`Falle en getShipment: ${error}`);
    return {
      ok: false,
      error,
      msg: `No se pudo procesar el servicio con OCA. Reintentar`,
      orderId: order.tra_id,
    };
  }
};
