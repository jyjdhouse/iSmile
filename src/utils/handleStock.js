const db = require('../database/models');
module.exports = async function (productsArray, method) {
    try {
        await Promise.all(productsArray.map(async item => {
            let { id, quantity } = item;

            await db.Product.update(
                // ejecuta la consulta sql literal para restar el quantity
                { stock: Sequelize.literal(`stock ${method == 'suma' ? '+' : '-'} ${quantity}`) },
                { where: { id } }
            );
        }));

        return { success: true, message: `Item ${method == 'suma' ? 'sumado' : 'restado'} del stock  exitosamente.` };
    } catch (error) {
        // Puedes manejar el error aquí o lanzarlo para que lo manejen en el controlador que llamó a esta función.
        return { success: false, message: `Ocurrió un error al ${method == 'suma' ? 'sumar' : 'restar'} stock en el pedido pedido.`, error: error.message };
    }
}
