const db = require('../database/models');

module.exports = async function (productsArray, method) { //[1,2,3]
    try {
        let arrayToBulkUpdate = [];
        let allProductOK = true;
        // Voy por cada item del array
        for (let i = 0; i < productsArray.length; i++) {
            const item = productsArray[i];
            let { id, quantity } = item;
            // Busco al producto
            let product = await db.Product.findByPk(id);
            if (product) {
                let newStock;
                if (method == 'suma') {
                    newStock = product.stock + quantity;
                    arrayToBulkUpdate.push({
                        id,
                        stock: newStock
                    })
                } else { //Aca es para restar
                    if (product.stock >= quantity) {
                        newStock = product.stock - quantity;
                        arrayToBulkUpdate.push({
                            id,
                            stock: newStock
                        });
                    } else {
                        allProductOK = false;
                    }
                }
            }
        };
        if (allProductOK) {
            await db.Order.bulkCreate(arrayToBulkUpdate, {
                updateOnDuplicate: ["stock"]
            });
            return { ok: true, message: `Item ${method == 'suma' ? 'sumado' : 'restado'} del stock  exitosamente.` };
        }


        return { ok: false, message: `Hay productos que solicitaste que no se encuentran en stock.` };
    } catch (error) {
        // Puedes manejar el error aquí o lanzarlo para que lo manejen en el controlador que llamó a esta función.
        return { ok: false, message: `Ocurrió un error al ${method == 'suma' ? 'sumar' : 'restar'} stock en el pedido pedido.`, error: error.message };
    }
}
