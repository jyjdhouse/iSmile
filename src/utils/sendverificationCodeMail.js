const nodemailer = require('nodemailer');
const provinces = require('./staticDB/provinces');
const dateFormater = require('./dateFormater');
const emailConfig = require('./staticDB/mailConfig');
async function sendVerificationCodeMail(code,userEmail) {
    code = code.split('');//Lo armo array
    // Configuración del transporte del correo
    const transporter = nodemailer.createTransport(emailConfig);

    // Contenido del correo
    let userMailContent = `
    <div style="display:flex;flex-direction:column;width:100%;align-items-center;">
        <p>Estimado usuario,</p>
        <p>Gracias por registrarte, su codigo de verificación es: </p>
        <div class="code-container" style="display:flex;width:40%;justify-content: space-between;">
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[0]}</p>
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[1]}</p>
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[2]}</p>
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[3]}</p>
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[4]}</p>
            <p style="border: 1px solid; width: fit-content; padding: 10px; ">${code[5]}</p>
        </div>
        <p>(Expira en 30 minutos)</p>
    </div>
    `;
    
    // Opciones del correo
    const userMailOptions = {
        from: 'ismile@ismile.com.ar',
        to: userEmail,
        subject: 'Codigo de Verificación',
        html: userMailContent
    };
    try {
        // Envío de los correos
        const userMail = await transporter.sendMail(userMailOptions);
        // console.log('Correos enviados:', userMail.messageId);
        return
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

module.exports = sendVerificationCodeMail