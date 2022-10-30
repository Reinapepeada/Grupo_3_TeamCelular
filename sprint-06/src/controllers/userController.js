const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { json } = require('body-parser');
const bcrypt = require("bcryptjs");
const user = require('user')


let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController={
  profile: (req, res)=>{

		res.render("profile", {user:req.session.userLogged})

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
      //let newUser={
        //id : lastId + 1,
        //...userToRegister,
        //password: bcrypt.hashSync(userToRegister.password, 10),
        //image: req.file? req.file.filename : "default-avatar.png"
      //}
      user.create({
        id: req.body.id,
        password: bcrypt.hashSync(userToRegister.password, 10),                
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.file? req.file.filename : "default-avatar.png",
        category: req.body.category
       // img: '../img/'+req.file.filename
    });
      //users.push(newUser)
      //fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/login');
    }
    },
      
    upload: (req, res) => {
     // let id = req.params.id;
     // let user = users.find(oneUsers => oneUsers.id == id );
       user.update({
        id: req.body.id,                
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.file? req.file.filename : "default-avatar.png",
        category: req.body.category
      },
      .then(function (user) {
      return res.render ('profile', {user});
      })
    },
detailView:(req, res)=>{
  res.render('userDetail')
},

    logout:(req, res)=>{
      req.session.userLogged = undefined;
      users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  
      res.redirect("/");
  } 
}

module.exports=userController