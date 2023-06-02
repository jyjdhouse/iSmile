const db = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {
    countryList: async(req,res)=>{
        try {
            const countryCodes = await db.CountryPhoneCode.findAll();
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: countryCodes.length,
                    url: 'api/countryCodeList'
                },
                count: countryCodes.length,
                countryCodes
            });
        } catch (error) {
            console.log(`Falle en apiMainController.countryList: ${error}`);
            return res.json(error);
        }
    }
};

module.exports = controller;
