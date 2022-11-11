const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { json } = require('body-parser');
const bcrypt = require("bcryptjs");

let modelPath = path.join(__dirname, '../database/models');
let db= require(modelPath)
let Users = db.Users;


const userController={
  profile: (req, res)=>{

    Users.findOne({
      email: req.body.email, 
    })
   
    .then(function (user) {
      req.session.userLogged = user;
		  return res.render("profile", {user})

	})
},
      register : (req,res) => {
        return res.render('register')
    },
    processRegister :  (req, res) => {
      //console.log (req.body);
      //return res.send (req.body);
     // let errors = validationResult(req);
     
     /* if(!errors.isEmpty()){
      let oldData = req.body;
        return res.render('register', {errors: errors.mapped(), oldData})
      } else {
      }*/
     
     // let newUser={
       // id : lastId + 1,
       // ...userToRegister,
       // password: bcrypt.hashSync(userToRegister.password, 10),
      //  image: req.file? req.file.filename : "default-avatar.png"
      //}
       const passBody = req.body.password
       console.log('passwd hash')
       
       const passwordHash = bcrypt.hashSync(passBody);
       console.log(passwordHash)
        Users.create({     
          email: req.body.email,
          password: passwordHash,
          user_category: req.body.user_category,
          status: req.body.status,
          full_name: req.body.full_name,
          country: req.body.country,
          profile_image: req.file ?  req.file.filename : "default-avatar.png",
          users_category:req.body.category,
          create_date: Date.now(),  
        //falta la imagen
        })
        .then(() => {
          res.redirect('/login');

        //  res.render('products/list_products',{ products });
        })
    
        .catch((error) => res.send(error));
      
    
      

      //users.push(newUser)

     // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
    },
      
    upload: (req, res) => {
     // let id = req.body.id;
    //  let user = users.find(oneUsers => oneUsers.id == id );

      Users.update({
        email:req.body.email,
        full_name:req.body.full_name,
        password:req.body.password,
        users_category:req.body.users_category,
        status:req.body.status,
        create_date: Date.now(),
        profile_image: req.file ?  req.file.filename : "default-avatar.png",
      },{
        where:{
            id: req.body.id
        }
      })
      .then((UserUpdate) => {
				console.log(UserUpdate);
				return res.redirect('profile');
			}).catch(error => console.log(error));
		
  
    },
    detailView:(req,res)=>{
      res.render('userDetail')
    },

    logout:(req, res)=>{
      req.session.userLogged = undefined;
      users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  
      res.redirect("/");
  } 
}

module.exports=userController