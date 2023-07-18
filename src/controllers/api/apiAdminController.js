const db = require('../../database/models');
const fs = require('fs');
// Librerias
const secret = require('../../utils/secret').secret;
const jwt = require('jsonwebtoken');
const json2csv = require('json2csv').parse;
const Sequelize = require('sequelize');
// Utils
const getDeepCopy = require('../../utils/getDeepCopy');
const getAllOrders = require('../../utils/getAllOrders');
const dateFormater = require('../../utils/dateFormater');
const provinces = require('../../utils/staticDB/provinces');
const orderStatuses = require('../../utils/staticDB/orderStatus');
const controller = {

  downloadClients: async (req, res) => {

    try {
      const clients = await db.User.findAll({
        where: {
          user_categories_id: 3
        },
        attributes: ['first_name', 'last_name', 'email', 'phone']
      })
      const csvData = json2csv(clients, {
        fields: [
          { label: 'Email', value: 'email' },
          { label: 'Nombres', value: 'first_name' },
          { label: 'Apellidos', value: 'last_name' },
          { label: 'Teléfono', value: 'phone' }
        ]
      });

      const timestamp = Date.now();
      const fileName = `CLIENTES_${timestamp}.csv`;

      const filePath = `public/csv/${fileName}`;
      // Codificar a UTF-8
      const utf8Data = '\ufeff' + csvData;

      try {
        await fs.promises.writeFile(filePath, utf8Data, { encoding: 'utf-8' });


        const headers = {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=${fileName}`
        };

        // Envía el archivo al cliente para descarga
        res.set(headers);
        fs.createReadStream(filePath).pipe(res);

        fs.unlink(filePath, (error) => {
          if (error) {
            console.log('Error al eliminar el archivo CSV:', error);
          } else {
            console.log('Archivo CSV eliminado exitosamente.');
          }
        });

      } catch (error) {
        console.error('Error al generar el archivo CSV:', error);
      }

    } catch (error) {
      console.log('Fallé en admin controller.downloadClientes' + ' ' + error)
      return res.send(error)
    }

  },
  getOrders: async (req, res) => {
    try {
      const limit = req.query.limit || undefined;
      const offset = req.query.offset || undefined;
      let orders = getDeepCopy(await db.Order.findAll({
        order: [
          [
            Sequelize.literal("cast(substring_index(tra_id, '-', 1) as unsigned)"),
            'DESC'
          ]
        ],
        include: ['paymentMethod','orderStatus','orderType','billingAddress','shippingAddress','orderItems']
      }));
      let statuses = orderStatuses;
      orders.forEach(ord => {
        ord.createdAt = dateFormater(ord.createdAt)
      });
      
      return res.status(200).json({
        meta: {
          status: 200,
          url: `api/admin/order`
        },
        ok: true,
        amount: orders.length,
        orders,
        provinces,
        statuses
      });
    } catch (error) {
      console.log(`Falle en adminApiController.getOrders: ${error}`);
      return res.status(500).json({
        true: false,
        error
      })
    }
  }
}

module.exports = controller