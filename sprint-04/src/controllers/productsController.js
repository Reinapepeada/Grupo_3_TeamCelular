const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
//////////
let productsFilePath = path.join(__dirname, '../../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//let products = require('../../public/js/products')


const { validationResult } = require('express-validator');


//abro el products.json y lo convierto a javascript con parse
const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))


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
             
              id:Math.random(),              
              name: req.body.name,
              description: req.body.description,
              price: req.body.price,
              img: '../img/'+req.file.filename
          }
    
        }else{
           product ={
            id:Math.random(),
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


// Update - Form to edit
      edit: (req, res) => {
        const product = products.find(item=>item.id==req.params.id);
        res.render('products/productEdit',{product: product});
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
    	// Update - Method to update
      update: (req, res) => {   
        let id = req.params.id
        let producToEdit = products.find(product => product.id == id)
    
        producToEdit ={
          id: producToEdit.id,
          ...req.body,
          img: '../img/'+producToEdit.img
        };
    
        let newProducts = products.map(product=>{
          if (product.id == producToEdit.id){
            return product = {...producToEdit}
          }
          return product;
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //res.redirect('/products/list_products/');
          
        res.render('products/list_products',{ products: products });

	    },

	destroy :(req, res) => {
    let id = req.params.id
    let finalProducts = products.filter(product=> product.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
    res.redirect('/products/list_products');
  },
  search: function(req, res){
    let nuevoArray=[];
    let valueIn;
      valueIn = req.query.search.toLowerCase()

     
     for(let i = 0; i< products.length; i++){
      console.log(products[i].name.toLowerCase().search(valueIn) != -1)
        if(products[i].name.toLowerCase().search(valueIn) != -1){
          
            nuevoArray.push(products[i])
            
            console.log('valor para array')
            console.log(products[i].name)
        }
     }

     console.log(nuevoArray)
     
     if(nuevoArray.length >0){
        res.render('products/filter_products',{products: nuevoArray, msg: 'Resultados de la búsqueda'});
     }else{
      res.render('products/list_products',{products: jsonData, msg: 'No hubo resultados para la búsqueda indicada'})
     }
  }
	
};

module.exports = productsController;