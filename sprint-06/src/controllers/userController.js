const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { json } = require('body-parser');
const bcrypt = require("bcryptjs");

let modelPath = path.join(__dirname, '../database/models');
let db= require(modelPath)
let Users = db.Users;
//let UsersCategorys = db.UserCategorys //alias

const userController={
  profile: (req, res) => {
    console.log("Que Usuario llega al profile: "+ req.session.userLogged.id )
    let idABuscar = req.session.userLogged.id;
    db.Users.findByPk(idABuscar).then((user) => {
      console.log('user en profile')
      console.log(user)
      return res.render("profile", { user: user });
    });
  },
      register : (req,res) => {
        return res.render('register')
    },
    processRegister :  (req, res) => {
       const passBody = req.body.password
       const passwordHash = bcrypt.hashSync(passBody);
       console.log(passwordHash)
        Users.create({     
          email: req.body.email,
          password: passwordHash,
          users_category: req.body.users_category,
          status: req.body.status,
          full_name: req.body.full_name,
          profile_image: req.file ?  req.file.filename : "default-avatar.png",
          create_date: Date.now(),  
        })
        .then(() => {
          res.redirect('/login');
        })
        .catch((error) => res.send(error));
    },
      
    upload: (req, res) => {
     // let id = req.body.id;
    //  let user = users.find(oneUsers => oneUsers.id == id );

      Users.update({
        email:req.body.email,
        full_name:req.body.full_name,
        password:req.body.password,
        users_category:req.body.category,
        status:req.body.status,
        create_date: Date.now(),
        profile_image: req.file  ?  req.file.filename : req.session.userLogged.profile_image,
      },{
        where:{
            id: req.body.id
        }
      })
      .then((UserUpdate) => {
        
				console.log(UserUpdate);
        console.log(req.body.users_category);
				return res.redirect('profile');
			}).catch(error => console.log(error));
  
    },
    detailView:(req,res)=>{
      res.render('userDetail')
    },

    logout: (req, res) => {
      res.clearCookie('user')
      res.locals.isLogged = false;
      req.session.destroy();
      res.redirect('/');
  
  } 
}

module.exports=userController