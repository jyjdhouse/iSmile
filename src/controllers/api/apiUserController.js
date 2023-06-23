const User = require('../../database/models/User');

// Librerias
const jwt = require('jsonwebtoken');
const getAllUsers = require('../../utils/getAllUsers');

// From utils
// const secret = require('../../utils/secret').secret;

const controller = {
    getLoggedUserId: async (req, res) => {
        try {
            let {userId,msg} = req;
            return res.status(200).json({
                meta: {
                    status: 200,
                    msg
                },
                userId         
            });
        } catch (error) {
            console.log(`Falle en apiUserController.getLoggedUser: ${error}`);
            return res.send(error)
        }
    },
    getUser: async (req, res) => {
        try {
            let userId = req.params.userId
            const user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if(!user) {
                return res.status(404).json({meta: {status: 404, msg: 'Usuario no encontrado'}})
            } 
            return res.status(200).json({meta: {status: 200, user}})
        } catch (error) {
            console.log(`Falle en apiUserController.getUser: ${error}`);
            return res.send(error)
        }
    },
    getAllUsers: async(req,res) =>{
        try {
            const users = await getAllUsers();
            return res.send(users)
        } catch (error) {
            console.log(`Falle en apiUserController.getAllUsers: ${error}`);
            return res.send(error)
        }
    }
};

module.exports = controller;
