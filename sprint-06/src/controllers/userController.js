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

		res.render("profile", {user:req.session.userLogged})

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
       const passwordHash = bcrypt.hashSync(req.body.password, 10) 
        Users.create({     
          email: req.body.email,
          password: passwordHash,
          user_category: req.body.user_category,
          status: req.body.status,
          full_name: req.body.full_name,
          country: req.body.country,
          profile_image: req.file ?  req.file.filename : "default-avatar.png",
          status: req.body.status,
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