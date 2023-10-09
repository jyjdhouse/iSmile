const nodemailer = require('nodemailer');
const emailConfig = require('./staticDB/mailConfig');
async function sendShippingOrderMail(order) {
    // Configuración del transporte del correo
    const transporter = nodemailer.createTransport(emailConfig);

    // Contenido del correo
    let mailHTML = `<p>Hola ${order.billing_first_name},</p>
    <p>Tu pedido ha sido empaquetado y listo para el envío.</p>
    <p>Número de seguimiento: ${order.oca_numero_envio}</p>
    <p>¡Gracias por elegirnos!</p>
    <img src="cid:galleryPhoto" id="mail-image" alt="mail-image" style="width:100%;height:35vh;object-fit:contain;">`;
    
    // Opciones del correo
    const userMailOptions = {
        from: 'ismile@ismile.com.ar',
        to: order.billing_email,
        subject: 'Seguimiento de tu envio',
        html: mailHTML,
        attachments: [{
            filename: 'mailLogo.png',
            path: __dirname + '/mailLogo.png',
            cid: 'galleryPhoto'
          }],
    };
    try {
        // Envío de los correos
        const userMail = await transporter.sendMail(userMailOptions);
        return {ok: true}
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendShippingOrderMail