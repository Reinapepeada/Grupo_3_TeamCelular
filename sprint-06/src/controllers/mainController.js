
//let products = require('../../public/js/products')
const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs')

let modelPath = path.join(__dirname, '../database/models');
let db= require(modelPath)
let Users = db.Users;

let Products = db.Product;

const { validationResult } = require('express-validator');
const { query } = require('express');


//abro el products.json y lo convierto a javascript con parse
//const jsonData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))



let mainController = {
    
    list: function(req, res){
        Products.findAll({
            include:[{association:"ProductsCategorys"}] 
        })
              .then(function(products){
                res.render('index',{products: products});
              })
            
           
      /*  res.render('index',{
            products: products,
        });*/
    },

    login: (req , res)=> {
        res.render('login');
    },

    loginEntry:(req, res)=>{
        let errors = validationResult(req);
        let usuarioLogueado=[];
        if(!errors.isEmpty()){
            console.log(errors)
            return res.render('login', {
                errors: errors.mapped(),
                oldData: req.body,
            });
        }else {
      /*  const usersFilePath = path.join(__dirname, '../../data/users.json');
        const userJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))*/
     
        const password = req.body.password
        Users.findOne({
            
            where:{
                email: req.body.email,
            }
        })
        .then((response) => {
            console.log(response.password)
            const passwordVerificar = bcrypt.compareSync(req.body.password, response.password)

            console.log(passwordVerificar)

            if(passwordVerificar){
                req.session.userLogged = response
                console.log(req.session.userLogged)
                console.log('todo ok se logueo bien')  
                res.redirect('/');
            }
           
           // let verificarpass = (bcryptjs.compareSync(req.body.password, 10), userLogin)

          //if(verificarpass){
           
   
           // }   
        })
        .catch((error) => res.send(error)); 
        }
        
    },


    services: (req , res)=> {
        function addAnotherIssue(){
          const contenedor=document.querySelector(".anotherIssue")
          contenedor.innerHTML="<input >"
        }

        res.render('services',)
      
    }
}
module.exports = mainController;