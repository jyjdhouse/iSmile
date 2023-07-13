const db = require('../../database/models');
const fs = require('fs')
const json2csv = require('json2csv').parse;

const controller = { 
    
    downloadClients: async (req, res) => {

    try {
        const clients = await db.User.findAll({
            where: {
                user_categories_id: 3
            },
            attributes: ['first_name', 'last_name', 'email', 'phone']
        })
        const csvData = json2csv(clients, { fields: ['name', 'last_name', 'email', 'phone'] });
    
        const timestamp = Date.now();
        const fileName = `archivo_${timestamp}.csv`;
    
        const filePath = `public/csv/${fileName}`;

        try {
          await fs.promises.writeFile(filePath, csvData);
          
      
          const headers = {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename=${fileName}.csv`
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
  
    }
}

module.exports = controller