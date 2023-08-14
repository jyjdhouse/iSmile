const db = require('../database/models');

module.exports = async function (productsArray, method) {
    try {
        await Promise.all(productsArray.map(async item => {
            let { id, quantity } = item;

            let product = await db.Product.findByPk(id); 
            if (product) {
                let newStock = method === 'suma' ? product.stock + quantity : product.stock - quantity;
                
                await db.Product.update({ stock: newStock }, {
                    where: {
                        id: product.id
                    }
                });
            }
        }));
        return { success: true, message: `Item ${method == 'suma' ? 'sumado' : 'restado'} del stock  exitosamente.` };
    } catch (error) {
        // Puedes manejar el error aquí o lanzarlo para que lo manejen en el controlador que llamó a esta función.
        return { success: false, message: `Ocurrió un error al ${method == 'suma' ? 'sumar' : 'restar'} stock en el pedido pedido.`, error: error.message };
    }
}
