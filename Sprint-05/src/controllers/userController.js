const fs = require('fs');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
const bcrypt = require("bcryptjs");


let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController={
    profile: (req, res)=>{
        const idUrl = req.params.id;
        console.log(idUrl)
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
         
        for(let user of users){
            if(parseInt(user.id) == parseInt(idUrl)){ 
              res.render('profile',{user: user}); 
           }
       }
      },
      register : (req,res) => {
        return res.render('register')
    },
    processRegister :  (req, res) => {
      //console.log (req.body);
      //return res.send (req.body);
      let errors = validationResult(req);
      console.log(errors.mapped());
      if(!errors.isEmpty()){
      let oldData = req.body;
        return res.render('register', {errors: errors.mapped(), oldData})
      } else {
      let userToRegister = req.body;
      let lastId = users.length !== 0 ? users[users.length - 1].id : 0
      delete userToRegister.password_confirm;
      let newUser={
        id : lastId + 1,
        ...userToRegister,
        password: bcrypt.hashSync(userToRegister.password, 10),
        //image: req.file? req.file.filename : "default-avatar.png"
      }
      users.push(newUser)
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/login');
    }
    },
      
      upload: function(req,res){
        let filenameVar;
        
         if(req.file !== undefined){
           filenameVar = req.file.filename
         }else{
    
           let jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
           for(let user of jsonData){
             if(parseInt(req.body.id) == parseInt(user.id)){
              
              filenameVar = user.image
           }
        }
           filenameVar = req.body.image
         }
        
         let jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
         let userUpdate ={
           id: req.body.id,                
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           image: filenameVar,
           category: req.body.category
           
       }
         for(let user of jsonData){
          
             if(parseInt(userUpdate.id) == parseInt(user.id)){
               user.firstName = userUpdate.firstName,
               user.lastName = userUpdate.lastName,
               user.email = userUpdate.email,
               user.image = userUpdate.image
               user.category = userUpdate.category
             
             req.session.userLogged = userUpdate
          
             jsonData = JSON.stringify(jsonData); //lo convierto a json
      
             fs.writeFileSync(usersFilePath, jsonData); //lo grabo en el json
    
             // lo convierto a js para poder recorrerlo en la vista
            jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
    
                return res.redirect('userDetail');
            //    res.render('userDetail',{user: userUpdate})
               }else{
                res.send('no lo actualizo porque no encontro')
           }
        }
    },
    detailView:(req,res)=>{
      res.render('userDetail')
    }, 
}

module.exports=userController