const db = require('../database/models');
const fs = require('fs');
const path = require('path');
// Librerias
const bcrypt = require('bcryptjs');
const getAllTreatments = require('../utils/getAllTreatments');
const getAllSpecialties = require('../utils/getAllSpecialties');
const getDeepCopy = require('../utils/getDeepCopy');
// Utils
const staticProducts = require('../utils/staticDB/products');
const { specialties, specialties_services, treatments } = require('../utils/staticDB/services');
const getSpecialtyService = require('../utils/getSpecialtyService');

const controller = {
    index: async (req, res) => {
        try {

            let homeFiles = await db.HomeFile.findAll({
                include: ['fileType', 'homeSection']
            });
            // Ahora secciono todo aca asi en el ejs se simplifica
            // VIDEO
            let homeVideo = homeFiles.find(file => file.home_sections_id == 1);
            let videoFile = {
                filename: homeVideo.filename,
                home_sections_id: homeVideo.home_sections_id
            }
            // GALLERY IMAGES
            let galleryFiles = homeFiles.filter(file => file.home_sections_id == 2);
            // Ordeno el array por posiciones
            galleryFiles.sort((a, b) => a.position - b.position);
            // Le dejo solo el filename
            galleryFiles = galleryFiles.map(file => {
                return {
                    filename: file.filename,
                    home_sections_id: file.home_sections_id,
                    position: file.position
                }
            });
            // IG
            let igFiles = homeFiles.filter(file => file.home_sections_id == 3);
            // Ordeno el array por posiciones
            igFiles.sort((a, b) => a.position - b.position);
            // Le dejo solo el filename
            igFiles = igFiles.map(file => {
                return {
                    filename: file.filename,
                    home_sections_id: file.home_sections_id,
                    position: file.position
                }
            });
            // BLOOG
            let blogImage = homeFiles.find(file => file.home_sections_id == 4);
            let blogFile = {
                filename: blogImage.filename,
                home_sections_id: blogImage.home_sections_id
            }

            return res.render('index', { videoFile, galleryFiles, igFiles, blogFile })

        } catch (error) {
            console.log(`Falle en mainController.list: ${error}`);
            return res.send(error);
        }
    },
    services: async (req, res) => {
        try {
            let specialties = getDeepCopy(await getAllSpecialties());

            // Ordeno los servicios
            specialties.forEach(specialty => {
                specialty.services = specialty.services.sort((a, b) => a.id - b.id);
            });
            // return res.send(specialties);
            return res.render('services', { specialties })
        } catch (error) {
            console.log(`Falle en mainController.services: ${error}`);
            return res.json({ error })
        }
    },
    serviceDetail: async (req, res) => {
        try {
            const serviceId = req.params.servicioId
            // A FUTURO
            let service = await getSpecialtyService(serviceId);
            // return res.send(service);

            return res.render('serviceDetail', { service })
        } catch (error) {
            console.log(`Falle en mainController.serviceDetail: ${error}`);
            return res.json({ error })
        }
    },
    frequentQAndA: async (req, res) => {
        try {
            return res.render('frequentQAndA')
        } catch (error) {
            console.log(`Falle en mainController.frequentQAndA: ${error}`);
            return res.json({ error })
        }
    },
    showMedicalForm: (req, res) => {
        return res.render('ClientMedicalInfo.ejs')
    },
    budget: async (req, res) => {
        let treatments = await getAllTreatments();
        // return res.send(treatments);
        return res.render('budget.ejs', { products: treatments })
    },
    consent: (req, res) => {
        return res.render('clientConsent');
    },
    updateHomeFile: async (req, res) => {
        try {
            const { home_sections_id, position, old_filename } = req.body;
            const file = req.file;
            const fileType = file.mimetype.startsWith('video/') ? 2 : 1;
            // Basicamente si suben video donde no tienen que los redirije devuelta, mismo con fotos
            if (fileType == 1 && home_sections_id == 1) return res.redirect('/');
            if (fileType == 2 && home_sections_id != 1) return res.redirect('/')
            // Actualizo en la db
            await db.HomeFile.update({
                filename: file.filename
            }, {
                where: {
                    home_sections_id,
                    position: position || null
                }
            });
            // Tengo que borrar la foto vieja asociada a esa section
            if (fileType == 2) { //video
                fs.unlinkSync(path.join(__dirname, `../../public/video/homePage/${old_filename}`))
            } else {
                fs.unlinkSync(path.join(__dirname, `../../public/img/homePage/${old_filename}`));
            }
            return res.redirect('/')
        } catch (error) {
            console.log(`Falle en mainController.updateHomeFile: ${error}`);
            return res.json({ error })
        }
    }
};

module.exports = controller;