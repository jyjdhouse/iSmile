const cron = require('node-cron');
const nodemailer = require('nodemailer');
const getAllUsers = require('./utils/getAllUsers');
const fs = require('fs');
const path = require('path');
const getDeepCopy = require('./utils/getDeepCopy');
const db = require('./database/models');
// const timePeriods = require('./utils/staticDB/timePeriods.js); TODO: activarlo cuando le mostremos asi lo pruebo

const timePeriods = {
  1: 1000 * 60 * 2, //2min
  2: 1000 * 60 * 5, //5min
  3: 1000 * 60 * 10, //10min
  4: 1000 * 60 * 15 //15min
}
function updateType(type) {
  if (type) { //Si ya viene alguno, le retorno 1 mas
    return (parseInt(type) + 1).toString()
  }
  return '1'
}
// MANDA MAILS PERIODICAMENTE
module.exports = cron.schedule('*/1 * * * *', async () => { //TODO: Cada 30 minutos
  function buildWishlistEmail() {
    // Aca armo el array con nombre y foto del producto
    wishedProducts = wishedProducts?.map(prod => {
      let file = prod.wishedProduct.files.find(file => file.file_types_id == 1)
      return {
        productName: prod.wishedProduct.name,
        productImage: file.filename
      }
    });

    let mailHTML = `<p>${user.name}, tienes productos en tu wishlist:<p>`
    let products = [];
    wishedProducts.forEach(prod => {
      const imagePath = path.join(__dirname, '../public/img/' + prod.productImage);

      mailHTML += `
          <p>
            <img src="${imagePath}" style="width: 100px; height: 100px;" alt="Imagen de producto"/>
            ${prod.productName}
          </p>
          <br>
        `
    });

    // Crea un objeto de transporte SMTP para enviar el correo electrónico
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'janoo.pereira@gmail.com',
        pass: 'wubwcoifjtogwonk'
      }
    });

    // Configura los detalles del correo electrónico a enviar
    let mailOptions = {
      from: 'janoo.pereira@gmail.com',
      to: 'janopk789@gmail.com',
      subject: 'ALTER EGO',
      html: mailHTML
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
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
  let wishedProducts;

  for (let i = 0; i < users.length; i++) {
    user = users[i];

                          //__________WISHLIST__________

    // Filtro los wishListProd por los que siguen vigentes
    wishedProducts = user.wishlistProducts?.filter(prod => prod.wishedProduct);
    // Ordeno para tener de mas reciente a menos reciente
    wishedProducts = wishedProducts?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    // Armo la logica si el usuario tiene wishedProducts
    if (wishedProducts) {

      // Agarro el ultimo wishedProduct que hay en la lista
      lastWishedProductAdded = new Date(wishedProducts[0].createdAt);
      // Agarro el ultimo email que se mando
      let lastEmailSent = new Date(user.last_wishlist_email);
      // Tengo que fijarme cuanto tiempo paso desde que se agrego un producto
      const actualTime = new Date(new Date().toISOString());
      // Aca me va a dar un numero en milisegundos
      let difference = actualTime - lastWishedProductAdded;
      let newType
      //Me fijo en que momento de los mails se encuentra el usuario
      switch (user.wishlist_period_type) {

        case '1': //Ya se mando el mail de 1hs
          difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
          // Me fijo si la diferencia supera 24hs (ms)
          if (difference >= timePeriods[2]) {//supero...
            buildWishlistEmail(); //Armo el email y lo mando
            user.last_wishlist_email = new Date()//hora actual
            //Actualizo el type
            newType = updateType(user.wishlist_period_type)

          };

          break;

        case '2': //Ya se mando el mail de 24hs
          difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
          // Me fijo si la diferencia supera 72hs (ms)
          if (difference >= timePeriods[3]) {//supero...
            buildWishlistEmail(); //Armo el email y lo mando
            user.last_wishlist_email = new Date()//hora actual
            //Actualizo el type
            newType = updateType(user.wishlist_period_type)
          }
          break;

        case '3': // Ya mando el mail de 72hs
          difference = actualTime - lastEmailSent;//Aca la diferencia tiene que ser con respecto al ultimo mail
          // Me fijo si la diferencia supera 1w (ms)
          if (difference >= timePeriods[4]) {//supero...
            buildWishlistEmail(); //Armo el email y lo mando
            user.last_wishlist_email = new Date()//hora actual
            //Actualizo el type
            newType = updateType(user.wishlist_period_type)
          }
          break;

        case '4': // Ya es lo ultimo
          // No cambia el type
          newType = user.wishlist_period_type
          break;

        default: // No se mando ningun mail
          // Me fijo si la diferencia supera 1hs (ms)
          if (difference >= timePeriods[1]) {//supero...
            buildWishlistEmail(); //Armo el email y lo mando
            user.last_wishlist_email = new Date()//hora actual
            //Actualizo el type
            newType = updateType(user.wishlist_period_type)
          };
          break;
      };
      // Pusheo el objeto para luego hacer bulkUpdate
      idsToUpdate.push({
        id: user.id,
        wishlist_period_type: newType || user.wishlist_period_type, //El or es por si no se modifica
        last_wishlist_email: user.last_wishlist_email
      })
    }

    // TODO:            __________CART__________
  }
  // console.log(idsToUpdate);
  // Una vez que hago esto con todos los usuarios, hago el bulkUpdate
  await db.User.bulkCreate(idsToUpdate, {
    updateOnDuplicate: ["wishlist_period_type","last_wishlist_email"]
  });
});
