const path = require('path')
const puppeteer = require('puppeteer');
const fs = require('fs')
const cheerio = require('cheerio');
const controller = {
    medicalPDF: async (req, res) => {
        let contentHTML = req.body.contentHTML;
        // console.log(contentHTML);
        contentHTML = contentHTML;
        let signaturePath;
        // TEMA FIRMA
        if (req.file) {
            let signature = req.file.buffer;
            const base64Image = signature.toString('base64');
            signaturePath = `data:${req.file.mimetype};base64,${base64Image}`;
        }


        // Crea una instancia de Puppeteer y abre una nueva página
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Establece el contenido HTML con los estilos y datos del formulario
        // Establece la URL de tu archivo CSS
        const cssFilePath = path.join(__dirname, '/clientMedicalInfo.css');
        const headerCssFilePath = path.join(__dirname, '/alternativeHeader.css');
        const lastRowCssFilePath = path.join(__dirname, './lastFormRow.css');
        const imageFilePath = path.join(__dirname, '/logo-background.png')

        // await page.emulateMedia('screen');
        // MODIFICO LAS IMAGENES
        // Utiliza cheerio para cargar el objeto HTML y manipularlo
        const $ = cheerio.load(contentHTML);

        // Modifica el atributo src de la etiqueta img específica
        $('img#img-logo').attr('src', `data:image/jpeg;base64,${fs.readFileSync(imageFilePath).toString('base64')}`);

        // Reemplaza un elemento específico por una etiqueta <img> con la imagen deseada
        $('.canvas-container').replaceWith(`<img src="${signaturePath}" alt="signature" class="signature-image">`);

        // Obtiene el objeto HTML modificado
        contentHTML = $.html();

        // Establece el contenido HTML en la página de Puppeteer
        await page.setContent(contentHTML, { waitUntil: 'networkidle0' });
        // To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');
        // path, can be relative or absolute path
        await page.addStyleTag({ path: cssFilePath });
        await page.addStyleTag({ path: headerCssFilePath });
        await page.addStyleTag({ path: lastRowCssFilePath });

        // Establecer las opciónes de generación del PDF
        const options = {
            format: 'A4', // Formato de página, por ejemplo: A4, Letter, etc.
            printBackground: true, // Incluir contenido de fondo
            margin: {
                top: "30px",
                right: "0px",
                bottom: "30px",
                left: "0px"
            },
            preferCSSPageSize: true, // Utilizar tamaños de página CSS definidos
        };

        // Toma una captura de pantalla de la página y genera un PDF
        const pdfBuffer = await page.pdf(options);

        // Cierra el navegador de Puppeteer
        await browser.close();

        // Envía el PDF como respuesta para descargarlo
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=formulario.pdf');
        res.send(pdfBuffer);
    },
    budgetPDF: async (req, res) => {
        try {
            let contentHTML = req.body.html;

            // Crea una instancia de Puppeteer y abre una nueva página
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();

            // Establece el contenido HTML con los estilos y datos del formulario
            // Establece la URL de tu archivo CSS
            const cssFilePath = path.resolve(__dirname, './budget.css');
const headerCssFilePath = path.resolve(__dirname, './alternativeHeader.css');
const imageFilePath = path.resolve(__dirname, './logo-background.png');

            // await page.emulateMedia('screen');
            // MODIFICO LAS IMAGENES
            // Utiliza cheerio para cargar el objeto HTML y manipularlo
            const $ = cheerio.load(contentHTML);

            // Modifica el atributo src de la etiqueta img específica
            $('img#img-logo').attr('src', `data:image/jpeg;base64,${fs.readFileSync(imageFilePath).toString('base64')}`);

            // Obtiene el objeto HTML modificado
            contentHTML = $.html();

            // Establece el contenido HTML en la página de Puppeteer
            await page.setContent(contentHTML, { waitUntil: 'networkidle0' });
            // To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');
            // path, can be relative or absolute path
            await page.addStyleTag({ path: cssFilePath })
            await page.addStyleTag({ path: headerCssFilePath })

            // Establecer las opciónes de generación del PDF
            const options = {
                format: 'A4', // Formato de página, por ejemplo: A4, Letter, etc.
                printBackground: true, // Incluir contenido de fondo
                margin: {
                    top: "30px",
                    right: "0px",
                    bottom: "30px",
                    left: "0px"
                },
                preferCSSPageSize: true, // Utilizar tamaños de página CSS definidos
            };

            // Toma una captura de pantalla de la página y genera un PDF
            const pdfBuffer = await page.pdf(options);

            // Cierra el navegador de Puppeteer
            await browser.close();

            // Envía el PDF como respuesta para descargarlo
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=formulario.pdf');
            res.send(pdfBuffer);
        } catch (error) {
            console.log(`Falle en budgetPDF: ${error}`);
            return res.json({ error })
        }
    },
    consentPDF: async (req, res) => {
        try {
            let contentHTML = req.body.contentHTML;
            // console.log(req.body);
            let signaturePath;
            // TEMA FIRMA
            if (req.file) {
                let signature = req.file.buffer;
                const base64Image = signature.toString('base64');
                signaturePath = `data:${req.file.mimetype};base64,${base64Image}`;
            }

            // Crea una instancia de Puppeteer y abre una nueva página
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            // Establece el contenido HTML con los estilos y datos del formulario
            // Establece la URL de tu archivo CSS
            const cssFilePath = path.join(__dirname, '/clientConsent.css');
            const headerCssFilePath = path.join(__dirname, '/alternativeHeader.css');
            const lastRowCssFilePath = path.join(__dirname, './lastFormRow.css');
            const imageFilePath = path.join(__dirname, '/logo-background.png')

            // await page.emulateMedia('screen');
            // MODIFICO LAS IMAGENES
            // Utiliza cheerio para cargar el objeto HTML y manipularlo
            const $ = cheerio.load(contentHTML);

            // Modifica el atributo src de la etiqueta img específica
            $('img#img-logo').attr('src', `data:image/jpeg;base64,${fs.readFileSync(imageFilePath).toString('base64')}`);
            
            // Reemplaza un elemento específico por una etiqueta <img> con la imagen deseada
            $('.canvas-container').replaceWith(`<img src="${signaturePath}" alt="signature" class="signature-image">`);
            
            // Obtiene el objeto HTML modificado
            contentHTML = $.html();

            // Establece el contenido HTML en la página de Puppeteer
            await page.setContent(contentHTML, { waitUntil: 'networkidle0' });
            // To reflect CSS used for screens instead of print
            await page.emulateMediaType('screen');
            // path, can be relative or absolute path
            await page.addStyleTag({ path: cssFilePath });
            await page.addStyleTag({ path: headerCssFilePath });
            await page.addStyleTag({ path: lastRowCssFilePath });

            // Establecer las opciónes de generación del PDF
            const options = {
                format: 'A4', // Formato de página, por ejemplo: A4, Letter, etc.
                printBackground: true, // Incluir contenido de fondo
                margin: {
                    top: "30px",
                    right: "0px",
                    bottom: "30px",
                    left: "0px"
                },
                preferCSSPageSize: true, // Utilizar tamaños de página CSS definidos
            };

            // Toma una captura de pantalla de la página y genera un PDF
            const pdfBuffer = await page.pdf(options);

            // Cierra el navegador de Puppeteer
            await browser.close();

            // Envía el PDF como respuesta para descargarlo
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=Consentimiento.pdf');
            res.send(pdfBuffer);
        } catch (error) {
            console.log(`Falle en pdfGeneratorController.consentPDf: ${error}`);
            return res.json({ error })
        }
    }
}
module.exports = controller;

