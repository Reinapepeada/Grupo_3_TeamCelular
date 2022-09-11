
let products = require('../../public/js/products')
const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');

let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const { validationResult } = require('express-validator');


//abro el products.json y lo convierto a javascript con parse
const jsonData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))



let mainController = {
    products: products,
    
    list: function(req, res){
        
        res.render('index',{
            products: products,
        });
    },

    login: (req , res)=> {
        res.render('login');
        next();
    },

    register: (req , res)=> {
        res.render('register');
        next();
    },
    
    services: (req , res)=> {
        res.render('services')
        next();
    },

    createUser:(req,res)=>{
        if(jsonData == ''){
            jsonData =[];
          }
          let user={}
          user={
            id:Math.random(),
            nickname:req.body.nickname,
            email:req.body.email,
            password:req.body.password
          }
          console.log(user)
          jsonData.push(user)
          jsonData_two = JSON.stringify(jsonData); //a json
          fs.writeFileSync('./data/users.json', jsonData_two);
          res.redirect("/")
    }
}
module.exports = mainController;