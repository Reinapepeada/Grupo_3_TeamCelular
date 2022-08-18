const path = require('path');

const mainController = {
    index: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/index.html'))},

    login: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/login.html'))},
    
    services: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/services.html'))},
    }

module.exports = mainController;