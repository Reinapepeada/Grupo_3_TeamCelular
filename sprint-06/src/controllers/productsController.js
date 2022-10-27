const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
//////////
let productsFilePath = path.join(__dirname, '../../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//let products = require('../../public/js/products')


let modelPath = path.join(__dirname, '../database/models');
let db= require(modelPath)

let Products = db.Product;
const { validationResult } = require('express-validator');


//abro el products.json y lo convierto a javascript con parse
const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))


let productsController = { 
    list_products: function(req, res){
      db.Products.findAll({
        include:[{association:"ProductsCategorys"},{association: "Colors"}, {association:"Brands"}] 
        })
          .then(function(products){
            res.render('products/list_products',{products: products});
          })
     //    res.render('products/list_products',{products: jsonData})
     },

     'create': function(req, res){
        const resultValidation = validationResult(req);
        
        let errors = validationResult(req)
       
        if(!errors.isEmpty()){
            return res.render('products/productCreate', {
                errors: resultValidation.mapped(),
                oldData: req.body,
              });
    
            }else{
          
              var miFechaActual = new Date()

              if(req.file !== undefined){
                Products.create({   
                            
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    product_code: req.body.product_code,
                    status: req.body.status,
                    category_id: req.body.category_id,
                    brand_id: req.body.brand_id,
                    color_id: req.body.color_id,
                    create_date: miFechaActual.getFullYear(),  
                    img_id: 11
                   // img: '../img/'+req.file.filename
                })
          
              }else{
                Products.create({
               
                  name: req.body.name,
                  description: req.body.description,
                  price: req.body.price, 
                  stock: req.body.stock,
                  product_code: req.body.product_code,
                  status: req.body.status,
                  category_id: req.body.category_id,
                  brand_id: req.body.brand_id,
                  color_id: req.body.color_id,
                  create_date: miFechaActual.getFullYear(),  
              //    img: '../img/sin-imagen.png'
                  img_id: 11 
              })
              Products.findAll().then((products) => {
                res.render('products/list_products',{ products });
              })
          
              .catch((error) => res.send(error));
            }
      }
    },
      

// Update - Form to edit
edit: (req, res) => {
  const product = products.find(item=>item.id==req.params.id);
  res.render('products/productEdit',{product: product});
    },
 viewFormCreate: function(req, res){
  const categorys = db.ProductsCategorys;
  const brands = db.Brands;
  const colors = db.Colors;
  const categorysAll = categorys.findAll()
  const brandsAll = brands.findAll()
  const colorsAll = colors.findAll()

  Promise.all([categorysAll, brandsAll, colorsAll])
    .then(function ([categorysAll, brandsAll, colorsAll]) {
    res.render('products/productCreate',{
      categorysAll, brandsAll, colorsAll
    });
    console.log('======pruebaa===========')
    console.log(categorysAll)
    })
    .catch(function (err) {
      console.error(err);
      res.send(err);
    });

    //    
    
 
      
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
    res.render('products/list_products',{ products: finalProducts });
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