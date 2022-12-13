const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)
let Users = db.Users;


const userApiController = {
    listUsers: async (req, res) => 
    { console.log("Estoy intentando listar desde la api")
        const users = await Users.findAll();
        const newUsersArray = users.map( (user) => {
            return  {
                id: user.id,
                full_name:  user.full_name,
                email: user.email,
                profile_image: user.profile_image,
                detail: "/api/users/" + user.id
            }
        });
        return res.json({
            count: users.length,
            users: newUsersArray
        });

    },
    showOneUser: async (req, res) => {
        console.log("Estoy listando desde la api buscando por ID")
        let userIdToFind = req.params.id;
        const user = await Users.findByPk(userIdToFind)        
        return res.json({
            id: user.id,
            full_name: user. full_name,
            email: user.email,
            profile_image: user.profile_image,
            category: user.users_category,
            create_date: user.create_date,
            status: user.status,
        })
    }
};

module.exports = userApiController;