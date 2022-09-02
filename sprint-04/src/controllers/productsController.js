
let products = require('../../public/js/products')
const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');

const { validationResult } = require('express-validator');


//abro el products.json y lo convierto a javascript con parse
const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))


const path = require('path');

let productsController = { 
    list_products: function(req, res){
         res.render('products/list_products',{products: jsonData})
     },

     create: function(req, res){
        const resultValidation = validationResult(req);
        
        let product = {};
        let errors = validationResult(req)
       
        if(!errors.isEmpty()){
            return res.render('products/productCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body,
              });
    
            }else{
          
        if(req.file !== undefined){
           product ={   
              //id: jsonData[products.length - 1].id + 1,              
              id: 5,              
              name: req.body.name,
              description: req.body.description,
              price: req.body.price,
              img: '../img/'+req.file.filename
          }
    
        }else{
           product ={
            id: 5,  
           // id: jsonData[products.length - 1].id + 1,  
            name: req.body.name,
            description: req.body.description,
            price: req.body.price, 
            img: '../img/sin-imagen.png' 
        } 
      }
      
      const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

          //products.push(product)    
          if(jsonData == ''){
            jsonData =[];
          }
          
          jsonData.push(product)
          jsonData_two = JSON.stringify(jsonData); //a json
          
          
          fs.writeFileSync('./data/products.json', jsonData_two);
          jsonData_three = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
          
          res.render('products/list_products',{ products: jsonData_three });
        }         
      },


    edit: function(req,res){
        const idUrl = req.params.id;

        for(let product of products){
         
            if(parseInt(product.id) == parseInt(idUrl)){
              console.log('encontrado')
            
              res.render('products/productEdit',{product: product});
              next();
           }
       }
    },
    viewFormCreate: function(req, res){
        res.render('products/productCreate');
    },

    list: function(req, res){
   
        res.render('products/products',{products: products});
    },
   
    detail: (req, res)=>{
        
       const product = products.find(oneProduct => oneProduct.id == req.params.id)
       res.render('products/productDetail', {product: product});
    },

}
module.exports = productsController;