const nodemailer = require('nodemailer');
const provinces = require('./staticDB/provinces');
const dateFormater = require('./dateFormater')
async function sendOrderMails(order) {
    // Configuración del transporte del correo
    const transporter = nodemailer.createTransport({
        // Configuración del servicio de correo saliente (SMTP)
        service: 'Gmail',
        auth: {
            user: 'janoo.pereira@gmail.com',
            pass: 'wubwcoifjtogwonk'
        }
    });

    // Contenido del correo
    let userMailContentDeliveryMethod = ``;
    let operatorMailContentDeliveryMethod = ``;
    if (order.order_types_id == 1) { //Domicilio
        userMailContentDeliveryMethod += `<p style="font-weight:600;">Envío a domicilio</p>`;
        operatorMailContentDeliveryMethod += `<p style="font-weight:600;">Envío a domicilio</p>`;
        if (order.is_same_address) { //Misma direccion (uso billingAddress)
            const province = provinces.find(prov => prov.id == order.billingAddress.provinces_id).name
            userMailContentDeliveryMethod +=
                `    
                <p style="color: #666;">${order.billingAddress.street} - C.P. ${order.billingAddress.zip_code} - ${order.billingAddress.city}, ${province}</p>
                `;
            operatorMailContentDeliveryMethod +=
                `    
                <p style="color: #666;">${order.billingAddress.street} - C.P. ${order.billingAddress.zip_code} - ${order.billingAddress.city}, ${province}</p>
                `;
        } else { //Distinta direccion (uso shippingAddress)
            const province = provinces.find(prov => prov.id == order.shippingAddress.provinces_id).name
            userMailContentDeliveryMethod +=
                `
                <p style="color: #666;">${order.shippingAddress.street} - C.P. ${order.shippingAddress.zip_code} - ${order.shippingAddress.city}, ${province}</p>
                `;
            operatorMailContentDeliveryMethod +=
                `
                <p style="color: #666;">${order.shippingAddress.street} - C.P. ${order.shippingAddress.zip_code} - ${order.shippingAddress.city}, ${province}</p>
                `
        }
    } else { //Retiro por local
        userMailContentDeliveryMethod =
            `
        <p style="font-weight:600;">Retiro por el local</p>
        <p style="color: #666;">Avenida Santa Fé 2911 3 F, C.P. 1425 Buenos Aires</p>
        <p style="color: #666;">Lunes a viernes / 10hs - 19hs</p>
        `
        operatorMailContentDeliveryMethod = `<p style="font-weight:600;">Retiro por el local</p>`
    };

    //   Tabla con items
    let tableContent = ``;
    order.orderItems.forEach(item => {
        tableContent +=
            `
        <tr>
            <td style="width:25%;text-align:center;">${item.name}</td>
            <td style="width:25%;text-align:center;">$${item.price}</td>
            <td style="width:25%;text-align:center;">${item.quantity}</td>
            <td style="width:25%;text-align:center;">${item.quantity * item.price}</td>
        </tr>
        `;
    });
    const userMailContent = `
    <main style="width:60%;margin: 0 auto;">
    <h2 style="font-weight:600;">Resumen de tu compra</h2>
    <p style="font-weight:600;">Id de venta</p>
    <p style="color: #666;">${order.tra_id}</p>
    <p style="font-weight:600;">Fecha</p>
    <p style="color: #666;">${dateFormater(order.createdAt)}</p>
    <p style="font-weight:600;">Datos de facturación</p>
    <p style="color: #666;">${order.billing_name} - Tel: ${order.billing_phone} - DNI: ${order.billing_id}</p>
    ${userMailContentDeliveryMethod}
    
    <table style="width:100%">
      <tr>
        <th style="width:25%;text-align:center;">Item</th>
        <th style="width:25%;text-align:center;">Precio unitario</th>
        <th style="width:25%;text-align:center;">Cantidad</th>
        <th style="width:25%;text-align:center;">Subtotal</th>
      </tr>
      ${tableContent}
    </table>
    <p style="font-size:22px;margin-top:30px;color:#222;">Total: $${order.total}</p>
    </main>
  `;

    const operatorMailContent =
        `
    <main style="width:60%;margin: 0 auto;">
    <h2 style="font-weight:600;">Se ha registrado una venta</h2>
    <p style="font-weight:600;">Id de venta</p>
    <p style="color: #666;">${order.tra_id}</p>
    <p style="font-weight:600;">Fecha</p>
    <p style="color: #666;">${dateFormater(order.createdAt)}</p>
    <p style="font-weight:600;">Datos de facturación</p>
    <p style="color: #666;">${order.billing_name} - Tel: ${order.billing_phone} - DNI: ${order.billing_id}</p>
    ${operatorMailContentDeliveryMethod}
    
    <table style="width:100%">
      <tr>
        <th style="width:25%;text-align:center;">Item</th>
        <th style="width:25%;text-align:center;">Precio unitario</th>
        <th style="width:25%;text-align:center;">Cantidad</th>
        <th style="width:25%;text-align:center;">Subtotal</th>
      </tr>
      ${tableContent}
    </table>
    <p style="font-size:22px;margin-top:30px;color:#222;">Total: $${order.total}</p>
    </main>
  `;
    // Opciones del correo
    const userMailOptions = {
        from: 'janoo.pereira@gmail.com',
        to: order.billing_email,
        subject: 'Resumen de compra',
        html: userMailContent
    };
    const operatorMailOptions = {
        from: 'janoo.pereira@gmail.com',
        to: 'janoo.pereira@gmail.com',
        subject: `Venta online - ${order.tra_id}`,
        html: operatorMailContent
    }
    try {
        // Envío de los correos
        const userMail = await transporter.sendMail(userMailOptions);
        const operatorMail = await transporter.sendMail(operatorMailOptions);
        // console.log('Correos enviados:', userMail.messageId);
        return
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendOrderMails