const db = require('../database/models') 
// Utils
const staticProducts = require('../utils/staticDB/products');
const {specialties, specialties_services, service_treatments} = require('../utils/staticDB/services');

const controller = {
    index: async (req, res) => {
        try {
            let homeFiles = await db.HomeFile.findAll({
                include: ['fileType','homeSection']
            });
            // Ahora secciono todo aca asi en el ejs se simplifica
            // VIDEO
            let homeVideo = homeFiles.find(file=>file.home_sections_id==1);
            let videoFile = {
                homeVideo
            }
            // GALLERY IMAGES
            let galleryFiles = homeFiles.filter(file=>file.home_sections_id==2);
            // Ordeno el array por posiciones
            galleryFiles.sort((a,b)=>a.position-b.position);
            // Le dejo solo el filename
            galleryFiles = galleryFiles.map(file=>{
                return {
                    filename:file.filename,
                    section_id: file.home_sections_id,
                    position: file.position
                }
            });
            // IG
            let igFiles = homeFiles.filter(file=>file.home_sections_id==3);
            // Ordeno el array por posiciones
            igFiles.sort((a,b)=>a.position-b.position);
            // Le dejo solo el filename
            igFiles = igFiles.map(file=>{
                return {
                    filename:file.filename,
                    section_id: file.home_sections_id,
                    position: file.position
                }
            });
            return res.send(igFiles)
            // BLOOG
            let blogFilename = homeFiles.find(file=>file.home_sections_id==4).filename;
            // return res.send(igFiles)
            return res.render('index',{videoFilename: homeVideo, galleryFiles, igFiles, blogFilename})
            
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
    updateHomeFile: (req,res)=>{
        return res.send(req.file);
    }
};

module.exports = controller;