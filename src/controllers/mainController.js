
/* const Service = require('../database/models/Service') */
// Utils
const staticProducts = require('../utils/staticDB/products');
const {specialties, specialties_services, service_treatments} = require('../utils/staticDB/services');

const controller = {
    index: async (req, res) => {
        try {    
            return res.render('index')
            
        } catch (error) {
            console.log(`Falle en mainController.list: ${error}`);
            return res.send(error);
        }
    },
    services: async(req,res)=>{
        try {
            
            return res.render('services', {services: specialties, specialties_services})
        } catch (error) {
            console.log(`Falle en mainController.services: ${error}`);
            return res.json({error})
        }
    },
    serviceDetail: async(req,res)=>{
        try {
            const serviceId = req.params.servicioId
            // A FUTURO
           /*  let service = await db.User.findByPk(req.params.serviceId); */
  
            const selectedServices = service_treatments.filter(serv => serv.specialty_id == serviceId)
    
            return res.render('serviceDetail', {service: selectedServices})
        } catch (error) {
            console.log(`Falle en mainController.serviceDetail: ${error}`);
            return res.json({error})
        }
    },
    frequentQAndA: async(req,res)=>{
        try {
            return res.render('frequentQAndA')
        } catch (error) {
            console.log(`Falle en mainController.frequentQAndA: ${error}`);
            return res.json({error})
        }
    },
    showMedicalForm: (req,res) =>{
        return res.render('ClientMedicalInfo.ejs')
    },
    budget: (req,res) =>{
        // return res.send(staticProducts);
        return res.render('budget.ejs',{products:staticProducts})
    },
    consent: (req,res) =>{
        return res.render('clientConsent');
    },
    getTestingProducts :(req,res) =>{
        return res.status(200).json({
            meta: {
                msg:"productos traidos correctamente"
            },
            products: staticProducts
        })
    }
};

module.exports = controller;