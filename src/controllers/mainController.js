const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Librerias
const bcrypt = require('bcryptjs');

const { specialties_services, specialties } = require('../utils/staticDB/services');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require('sharp');
// AWS 
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// Creo el objeto
const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});
// Utils
const getAllTreatments = require('../utils/getAllTreatments');
const getAllSpecialties = require('../utils/getAllSpecialties');
const getDeepCopy = require('../utils/getDeepCopy')
const homePageLabels = require('../utils/staticDB/homePageLabels');
const getSpecialtyService = require('../utils/getSpecialtyService');

const controller = {
    index: async (req, res) => {
        try {

            let homeFiles = await db.HomeFile.findAll({
                where:{
                    home_sections_id: {
                        [Op.ne]: 5 //Traigo todos los que corresponden al index
                    }
                },
                include: ['fileType', 'homeSection']
            });
            // Ahora seccióno todo aca asi en el ejs se simplifica
            // VIDEO
            let homeVideo = homeFiles.find(file => file.home_sections_id == 1);
            // Hago la busqueda del archivo en db
            const getHomeVideoObjectParams = {
                Bucket: bucketName,
                Key: `homePage/${homeVideo.filename}`
            }
            const homeVideoCommand = new GetObjectCommand(getHomeVideoObjectParams);
            const homeVideoUrl = await getSignedUrl(s3, homeVideoCommand, { expiresIn: 1800 }); //30 min
            let videoFile = {
                filename: homeVideo.filename,
                home_sections_id: homeVideo.home_sections_id,
                file_url: homeVideoUrl
            }
            // GALLERY IMAGES
            let galleryFiles = homeFiles.filter(file => file.home_sections_id == 2);
            // Ordeno el array por posiciónes
            galleryFiles.sort((a, b) => a.position - b.position);
            let galleryFilesToRender = [];
            for (let i = 0; i < galleryFiles.length; i++) {
                const file = galleryFiles[i];
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: `homePage/${file.filename}`
                }
                const command = new GetObjectCommand(getObjectParams);
                url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min;
                galleryFilesToRender.push({
                    filename: file.filename,
                    home_sections_id: file.home_sections_id,
                    position: file.position,
                    file_url: url
                })
            }
            // return res.send({galleryFilesToRender, homePageLabels})
            // IG
            let igFiles = homeFiles.filter(file => file.home_sections_id == 3);
            // Ordeno el array por posiciónes
            igFiles.sort((a, b) => a.position - b.position);
            let igFilesToRender = [];
            for (let i = 0; i < igFiles.length; i++) {
                const file = igFiles[i];
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: `homePage/${file.filename}`
                }
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min;
                igFilesToRender.push({
                    filename: file.filename,
                    home_sections_id: file.home_sections_id,
                    position: file.position,
                    file_url: url
                })
            }

            // BLOOG
            let blogImage = homeFiles.find(file => file.home_sections_id == 4);
            // Hago la busqueda del archivo en db
            const getBlogObjectParams = {
                Bucket: bucketName,
                Key: `homePage/${blogImage.filename}`
            }
            const blogCommand = new GetObjectCommand(getBlogObjectParams);
            const blogUrl = await getSignedUrl(s3, blogCommand, { expiresIn: 1800 }); //30 min
            let blogFile = {
                filename: blogImage.filename,
                home_sections_id: blogImage.home_sections_id,
                file_url: blogUrl
            }

            const products = await db.Product.findAll({
                // de más nuevo a más viejo
                order: [['createdAt', 'DESC']],
                limit: 6
            });

            return res.render('index', { videoFile, galleryFiles: galleryFilesToRender, igFiles: igFilesToRender, blogFile, products, homePageLabels })

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
            const specialtyId = req.params.specialtyId;

            const serviceSpecialtyId = req.params.specialtyServiceId;
            const specialtyService = await db.SpecialtyService.findByPk(serviceSpecialtyId)

            let title;
            let treatments = getDeepCopy(await db.Treatment.findAll());
            treatments = treatments.filter(treatment => {
                if (serviceSpecialtyId) {
                    title = specialties_services.find(serv => serv.id == serviceSpecialtyId).name;
                    return treatment.specialties_id == specialtyId && treatment.specialties_services_id == serviceSpecialtyId;
                }
                title = specialties.find(spec => spec.id == specialtyId).name;
                // Sino son los que no tienen subcategoria
                return treatment.specialties_id == specialtyId
            });
            // Para obtener las url
            // return res.se
            for (let index = 0; index < treatments.length; index++) {
                const treatment = treatments[index];
                if (treatment.filename) {
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `treatment/${treatment.filename}`
                    }
                    const command = new GetObjectCommand(getObjectParams);
                    url = await getSignedUrl(s3, command, { expiresIn: 1800 }); //30 min;
                    treatment.file_url = url;
                };
            };
            // return res.send(treatments);
            return res.render('serviceDetail', { services: treatments, title, specialtyService })
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
    updateHomeFile: async (req, res) => {
        try {
            const { home_sections_id, position, old_filename } = req.body;

            const file = req.file;
            const fileType = file.mimetype.startsWith('video/') ? 2 : 1;
            // Basicamente si suben video donde no tienen que los redirije devuelta, mismo con fotos
            if (fileType == 1 && home_sections_id == 1) return res.redirect('/');
            if (fileType == 2 && home_sections_id != 1) return res.redirect('/')
            // Actualizo en la db
            let randomName, buffer;
            // PARA AWS
            if (fileType == 1) {//FOTO
                // Creo el nombre unico para la foto (dentro del forEach)
                randomName = 'homeFile' + Math.random().toString(36).substring(2, 2 + 10) + '.webp';
                // Cambio el formato a webp y redimensiono la imagen, total la de los productos 
                //  no se necesita tan gde      .resize({ height: 1920, width: 1080, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                buffer = await sharp(file.buffer).toFormat('webp').toBuffer();

            } else {//VIDEO
                // Creo el nombre unico para el video
                randomName = 'homeFile-' + Math.random().toString(36).substring(2, 2 + 10) + path.extname(file.originalname);
                // Creo el nombre unico para el video
                buffer = file.buffer;
            }
            // Lo unico que hago es rescribir la imagen que ya estaba   
            let params = {
                Bucket: bucketName,
                Key: `homePage/${randomName}`,//Esto hace que se guarde en la carpeta homePage, y que sobreEscriba a la foto vieja
                Body: buffer,
                ContentType: file.mimetype
            };
            let command = new PutObjectCommand(params);
            await s3.send(command);
            // Ahora tengo que borrar lo viejo en AWS
            let fileToRemove = await db.HomeFile.findOne({
                where: {
                    home_sections_id,
                    position: position || null
                }
            });
            params = {
                Bucket: bucketName,
                Key: `homePage/${fileToRemove.filename}`,
            };
            command = new DeleteObjectCommand(params);
            await s3.send(command);
            // Actualizo en la db
            await db.HomeFile.update({
                filename: randomName
            }, {
                where: {
                    home_sections_id,
                    position: position || null
                }
            });

            return res.redirect('/');
        } catch (error) {
            console.log(`Falle en mainController.updateHomeFile: ${error}`);
            return res.json({ error })
        }
    }
};

module.exports = controller;