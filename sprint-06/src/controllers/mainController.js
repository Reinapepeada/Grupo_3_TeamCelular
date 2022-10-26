
//let products = require('../../public/js/products')
const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
let bcryptjs = require('bcryptjs')

let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let modelPath = path.join(__dirname, '../database/models');

let db= require(modelPath)

const { validationResult } = require('express-validator');
const { query } = require('express');


//abro el products.json y lo convierto a javascript con parse
const jsonData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))



let mainController = {
    
    list: function(req, res){
        db.Products.findAll({
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
        const usersFilePath = path.join(__dirname, '../../data/users.json');
        const userJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
        let users;
        if(userJSON == ''){
            users = []
        }else{
            users = userJSON
           
            for(let user of users){
                if(user.email == req.body.email){
                      
                    let verificarpass = bcryptjs.compareSync(req.body.password, user.password)
                   // console.log(verificarpass) 
                    if(verificarpass){
                        usuarioLogueado = user
                        req.session.userLogged = usuarioLogueado
                      console.log(req.session.userLogged)
                      
                    }
                }
            }
        }
            if(usuarioLogueado <=0){
                console.log('is empty')
                return res.render('login', {
                    errors: errors.mapped(),
                    errors:[{msg:'Las credenciales no coinciden'}],
                    oldData: req.body,
                });
            }else{
                
                if(req.body.remember_user != undefined){
                    //guardo una cookie 
                    res.cookie('remember_user', userLogged.email,{
                        maxAge: 600000
                    })
                }
                                          
               if(req.session.userLogged.category == "Admin"){
                
                const usersFilePathProducts = path.join(__dirname, '../../data/products.json');
                const products = JSON.parse(fs.readFileSync(usersFilePathProducts, 'utf-8'))
                 res.render('products/list_products',{products: products})  
                   
               }else{
                   return res.redirect('/')
               }
            }
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