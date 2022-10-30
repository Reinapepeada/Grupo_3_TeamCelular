const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const multer = require('multer');
const { json } = require('body-parser');
const bcrypt = require("bcryptjs");


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
     // let newUser={
       // id : lastId + 1,
       // ...userToRegister,
       // password: bcrypt.hashSync(userToRegister.password, 10),
      //  image: req.file? req.file.filename : "default-avatar.png"
      //}
      Users.create({
               
        name: req.body.name,
        password: bcrypt.hashSync(userToRegister.password, 10),
        create_date: miFechaActual.getFullYear(),  
        product_code: req.body.product_code,
    //    img: '../img/sin-imagen.png'
        img_id: 11 
    })

      //users.push(newUser)

     // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
      res.redirect('/login');
    }
    },
      
    upload: (req, res) => {
     // let id = req.body.id;
    //  let user = users.find(oneUsers => oneUsers.id == id );

      Users.update({
        name:req.body.name,
        password:req.body.password,
        product_code:req.body.product_code,
        price:req.body.price,
        description:req.body.description,
        color_id:req.body.color_id,
        status:req.body.status,
        category_id:req.body.category_id,
        brand_id:req.body.brand_id,
        create_date:req.body.create_date,
        img_id: 'sin-img'
      },{
        where:{
            id: req.body.id
        }
      })
      .then(function (user) {
        return res.render ('profile', {user});
      })  
  
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