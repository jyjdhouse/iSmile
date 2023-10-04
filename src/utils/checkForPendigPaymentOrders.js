const cron = require("node-cron");
// Libreries
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../database/models");

const getDeepCopy = require("./getDeepCopy");
const handleStock = require("./handleStock");

// Chequear cada 6hs
module.exports = cron.schedule("0 */6 * * *", async () => {
  try {
    const ordersWithPendingPayment = getDeepCopy(
      await db.Order.findAll({
        where: {
          order_status_id: 3, //pendiente de pago
          order_types_id: { [Op.in]: [2, 3]} //Que sea pago con tarjeta
        },
        include: ["orderItems"],
      })
    );
    let ordersToUpdate = []; //Array para el bulkupdate
    let itemsToRestock = []; //Array para restokear
    ordersWithPendingPayment.forEach((order) => {
      // Me fijo si el tiempo de esa orden es > a 20 min (me aseguro que se haya vencido el periodo de pago)
      order.pending_payment_date = order.pending_payment_date
        ? new Date(order.pending_payment_date)
        : null;
      const currentTime = new Date();
      const twentyMinLater = new Date(
        order?.pending_payment_date?.getTime() + 60 * 1000 * 20
      );
      // Si pasaron 20 min y la orden sigue con el pago pendiente
      if (currentTime >= twentyMinLater || !order.pending_payment_date) {
        console.log(
          `Han transcurrido mas de 15 minutos. Actualización de estado realizada con la orden ${order.tra_id}.`
        );
        ordersToUpdate.push({
          id: order.id,
          order_status_id: 5, //Anulada,
          details: `Compra anulada por vencimiento de pago`,
          pending_payment_date: null,
          is_pending_payment_expired: 1,
        });
        //Voy por los orderItems para armar el array de restockeo
        order.orderItems.forEach((item) => {
          // busco si el item ya esta en el array para mandar a handleStock
          const itemAlreadyInArrayIndex = itemsToRestock.findIndex(
            (itemInArray) => itemInArray.id == item.products_id
          );
          if (itemAlreadyInArrayIndex >= 0) {
            // Si ya esta, le sumo al quantity la quantity del item este
            itemsToRestock[itemAlreadyInArrayIndex].quantity += parseInt(
              item.quantity
            );
          } else {
            itemsToRestock.push({
              id: item.products_id,
              quantity: parseInt(item.quantity),
            });
          }
        });
      }
    });
    // Si hubo ordenes para hacer la anulacion...
    if (ordersToUpdate.length) {
      //Hago el bulkupdate
      await db.Order.bulkCreate(ordersToUpdate, {
        updateOnDuplicate: [
          "order_status_id",
          "details",
          "pending_payment_date",
          "is_pending_payment_expired",
        ],
      });
      //Tengo que sumar al stock los productos
      const stockResponse = await handleStock(itemsToRestock, "suma");
      if (!stockResponse.ok) {
        console.log(`Hubo un error al sumar los items al stock`);
        return;
      }
      return console.log(
        `Ordenes con pago vencido actualizadas. Productos re-stockeados`
      );
    }
    return;
  } catch (error) {
    return console.log(`Falle en checkForPendigPaymentOrders: ${error}`);
  }
});
