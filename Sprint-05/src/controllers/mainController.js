
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
                      
                    //se modifica cuando ya este el alta de usuario 
                  //  let verificarpass = bcryptjs.compareSync(req.body.password, user.password)
                   // console.log(verificarpass) 
                 //   if(verificarpass){
                        usuarioLogueado = user
                        req.session.usuarioLogueado = usuarioLogueado
                        break
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
                    res.cookie('remember_user', usuarioLogueado.email,{
                        maxAge: 600000
                    })
                }
                                          
               if(req.session.usuarioLogueado.category == "Admin"){
                
                const usersFilePathProducts = path.join(__dirname, '../../data/products.json');
                const products = JSON.parse(fs.readFileSync(usersFilePathProducts, 'utf-8'))
                 res.render('products/list_products',{products: products})  
                   
               }else{
                   return res.redirect('/')
               }
            }
        }
        
    },

    register: (req , res)=> {
        res.render('register');
     
    },
    
    services: (req , res)=> {
        res.render('services')
      
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