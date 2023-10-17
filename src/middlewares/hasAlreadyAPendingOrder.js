const db = require("../database/models");
const hasAlreadyAPendingOrder = async function (req, res, next) {
  try {
    console.log(req.session);
    // Quiere decir que tiene pendiente una compra
    if (req.session.order_tra_id) {
      const pendingOrder = await db.Order.findOne({
        where: {
          tra_id: req.session.order_tra_id,
        },
      });
      if (pendingOrder.order_status_id == 3) {
        //Pendiente de pago
        return res.redirect("/user/checkout/pago-seguro"); //Lo mando a la vista de pago seguro
      }
    }
    next();
  } catch (error) {
    console.log(`Falle en hasAlreadyAPendingOrder: ${error}`);
    return res.json({error})
  }
};

module.exports = hasAlreadyAPendingOrder;
