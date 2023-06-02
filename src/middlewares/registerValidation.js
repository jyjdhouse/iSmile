/* const { body } = require("express-validator");
const path = require('path');
const db = require("../database/models");

const validations = [ 

    body("email")
        .custom(async (value, { req }) => { 
            try {
                const emailBody = req.body.email.toLowerCase();

                const userAlreadyInDb = await db.User.findOne({
                    where: {
                        email: emailBody
                    }
                });

                if(userAlreadyInDb) { 
                    return Promise.reject(`El email ya se encuentra registrado`)
                }

                return true;

            } catch (error) {
                console.log(`Fallé en la validación del device type: ${error}`);
            }


        }),
   ]

 /*    body("device_images") //checking for accepted images
        .custom((value, { req }) => {

            const bodyImages = req.files;
            const acceptedExtension = ['.jpg', '.jpeg', '.png'];

            if (!bodyImages) {
                throw new Error("Tenés que seleccionar las imagenes")
            }

            bodyImages.forEach(image => {

                const imageIsAccepted = acceptedExtension.includes(path.extname(image.originalname));

                if (!imageIsAccepted) {
                    throw new Error(`Las extensiones aceptadas son ${acceptedExtension.join(', ')}`)
                }


            })

            return true;

        }),
 */ 