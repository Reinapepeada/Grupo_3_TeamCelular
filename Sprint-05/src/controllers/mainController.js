const bcrypt = require("bcryptjs");
let products = require('../../public/js/products')
const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');

let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const { validationResult } = require('express-validator');
const { query } = require('express');


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
		console.log("user" + req.body.password);

		const userToLogin = users.find(oneUser => oneUser.email === req.body.email);

		console.log("pass" + userToLogin.password)
		if(userToLogin){
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password)
			if(isPasswordCorrect){
				delete userToLogin.password;
				
				req.session.userLogged= userToLogin;
			
				if(req.body.recordame != undefined){
			
				res.cookie("recordame", req.session.userLogged.email, {maxAge: 100000})
				}
                return res.send(userToLogin);;
			}
		}
		return res.redirect('/');

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