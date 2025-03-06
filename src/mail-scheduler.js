const cron = require('node-cron');
const nodemailer = require('nodemailer');
const getAllUsers = require('./utils/getAllUsers');
const getDeepCopy = require('./utils/getDeepCopy');
const db = require('./database/models');
const emailConfig = require('./utils/staticDB/mailConfig');
const timePeriods = require('./utils/staticDB/timePeriods.js');
// const timePeriods = {
//   1: 1000 * 60 * 2, //2min
//   2: 1000 * 60 * 5, //5min
//   3: 1000 * 60 * 10, //10min
//   4: 1000 * 60 * 15 //15min
// }
function updateType(type) {
  if (type) { //Si ya viene alguno, le retorno 1 mas
    return (parseInt(type) + 1).toString()
  }
  return '1'
}
// MANDA MAILS PERIODICAMENTE
module.exports = cron.schedule('*/30 * * * *', async () => {
  function buildCartProductsEmail(user) {
    // Aca armo el array con nombre y foto del producto
    cartProducts = cartProducts?.map(prod => {
      // let file = prod.wishedProduct.files.find(file => file.file_types_id == 1)
      return {
        productName: prod.product.name,
        productPrice: prod.product.price
      }
    });

    let tableContent = '';
    cartProducts.forEach(prod => {
      // const imagePath = path.join(__dirname, '../public/img/' + prod.productImage);
      {/* <img src="${imagePath}" style="width: 100px; height: 100px;" alt="Imagen de producto"/> */ }
      tableContent +=
        `
        <tr>
            <td style="width:50%;text-align:center;padding: 10px 0;">${prod.productName}</td>
            <td style="width:50%;text-align:center;padding: 10px 0;">$${prod.productPrice}</td>
        </tr>
        `;
    });
    const cartSubTotal = cartProducts.reduce((total, product) => total + product.productPrice, 0)
    let mailHTML = `
    <img src="cid:galleryPhoto" id="mail-image" alt="mail-image" style="width:100%;height:35vh;object-fit:contain;">
    <p style="font-size:23px;width:100%;">¡Hola ${user.first_name}!</p><br>
    <p>Hemos notado que dejaste algunos productos en tu carrito de compras. ¡No te preocupes, todavía están disponibles! Si tienes alguna pregunta sobre los productos o necesitas ayuda para completar tu compra, no dudes en contactarnos.</p><br>
    <p>Haz clic en el siguiente enlace para volver a tu carrito y finalizar tu compra: <a href="https://ismile.com.ar/user/checkout?fromEmail=true">Ir al carro</a>.</p><br>

    <table style="width:100%;margin-bottom:30px;">
      <tr>
        <th style="width:50%;text-align:center;padding: 10px 0;">Item</th>
        <th style="width:50%;text-align:center;padding: 10px 0;">Precio unitario</th>
      </tr>
      ${tableContent}
    </table>
    <p style="font-size:22px;margin-top:20px;color:#222;">Subtotal: $${cartSubTotal}</p><br>
    <p>Agradecemos tu interés en nuestros productos y esperamos verte pronto.</p><br>
    <p>¡Saludos cordiales!</p><br>
    <p>El Equipo de I Smile 💜.</p><br>
    `
    // Crea un objeto de transporte SMTP para enviar el correo electrónico
    // console.log(emailConfig);
    let transporter = nodemailer.createTransport(emailConfig);

    // Configura los detalles del correo electrónico a enviar
    let mailOptions = {
      from: 'ismile@ismile.com.ar',
      to: user.email,
      subject: `💜No olvides tus productos en el carrito! 🛒`,
      html: mailHTML,
      attachments: [{
        filename: 'mailPhoto.jpg',
        path: __dirname + '/mailPhoto.jpg',
        cid: 'galleryPhoto'
      }],
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`ERROR al mandar mail: ${error}`);
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
      }
    });
  }

  // Configura la tarea programada para enviar el correo electrónico cada hora

  let users = await getAllUsers();
  users = getDeepCopy(users);
  let user;
  // Este array es para hacer el bulkCreate
  let idsToUpdate = [];


  // Voy por cada usuario, me fijo su wishListProducts y armo el mail
  let cartProducts;
  // Esto es basicamente para no actualizar la db al pedo
  let emailSent = false;
  for (let i = 0; i < users.length; i++) {
    user = users[i];
    //__________CART__________
    if (user.temporalCart) {
      // Filtro los cartProducts por los que siguen vigentes
      cartProducts = [...user.temporalCart.temporalItems];
      // Ordeno para tener de mas reciente a menos reciente
      cartProducts = cartProducts?.sort((a, b) => b.id - a.id);
      // Armo la logica si el usuario tiene cartProducts
      if (cartProducts.length) {

        // Agarro el ultimo cartProduct que hay en la lista
        const lastCartProductAdded = new Date(cartProducts[0].added_date);
        // Agarro el ultimo email que se mando
        let lastEmailSent = new Date(user.last_cart_email);
        // Tengo que fijarme cuanto tiempo paso desde que se agrego un producto
        const actualTime = new Date(new Date().toISOString());
        // Aca me va a dar un numero en milisegundos
        let difference = actualTime - lastCartProductAdded;
        let newType;
        //Me fijo en que momento de los mails se encuentra el usuario
        switch (user.cart_period_type) {

          case '1': //Ya se mando el mail de 1hs
            difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
            // Me fijo si la diferencia supera 24hs (ms)
            if (difference >= timePeriods[2]) {//supero...
              buildCartProductsEmail(user); //Armo el email y lo mando
              emailSent = true;
              user.last_cart_email = new Date()//hora actual
              //Actualizo el type
              newType = updateType(user.cart_period_type)

            };

            break;

          case '2': //Ya se mando el mail de 24hs
            difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
            // Me fijo si la diferencia supera 72hs (ms)
            if (difference >= timePeriods[3]) {//supero...
              buildCartProductsEmail(user); //Armo el email y lo mando
              emailSent = true;
              user.last_cart_email = new Date()//hora actual
              //Actualizo el type
              newType = updateType(user.cart_period_type)
            }
            break;

          case '3': // Ya mando el mail de 72hs
            difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
            // Me fijo si la diferencia supera 1w (ms)
            if (difference >= timePeriods[4]) {//supero...
              buildCartProductsEmail(user); //Armo el email y lo mando
              emailSent = true;
              user.last_cart_email = new Date()//hora actual
              //Actualizo el type
              newType = updateType(user.cart_period_type)
            }
            break;

          case '4': // Ya es lo ultimo
            // No cambia el type
            newType = user.cart_period_type
            break;

          default: // No se mando ningun mail
            // Me fijo si la diferencia supera 1hs (ms)
            if (difference >= timePeriods[1]) {//supero...
              buildCartProductsEmail(user); //Armo el email y lo mando
              emailSent = true;
              user.last_cart_email = new Date()//hora actual
              //Actualizo el type
              newType = updateType(user.cart_period_type)
            };
            break;
        };
        // Pusheo el objeto para luego hacer bulkUpdate
        idsToUpdate.push({
          id: user.id,
          cart_period_type: newType || user.cart_period_type, //El or es por si no se modifica
          last_cart_email: user.last_cart_email
        })
      }
    }

  }
  if (emailSent) { //Si se mando algun email ahi solo actualizo la db
    // Una vez que hago esto con todos los usuarios, hago el bulkUpdate
    await db.User.bulkCreate(idsToUpdate, {
      updateOnDuplicate: ["cart_period_type", "last_cart_email"]
    });
  }

});
