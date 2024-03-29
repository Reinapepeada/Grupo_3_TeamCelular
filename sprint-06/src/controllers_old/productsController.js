const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');
//////////
//let productsFilePath = path.join(__dirname, '../../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//let products = require('../../public/js/products')

const { validationResult } = require('express-validator');

let modelPath = path.join(__dirname, '../database/models');
let db= require(modelPath)
let Products = db.Product;
let Categorys = db.ProductsCategorys;
let Brands = db.Brands;
let Colors = db.Colors


//abro el products.json y lo convierto a javascript con parse
//const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))


let productsController = { 
    list_products: function(req, res){
      Products.findAll({
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
                    img_id: 11,
                    product_code: req.body.product_code
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
                  product_code: req.body.product_code,
              //    img: '../img/sin-imagen.png'
                  img_id: 11 
              })
              Products.findAll().then((products) => {
                res.redirect('/products/list_products');

              //  res.render('products/list_products',{ products });
              })
          
              .catch((error) => res.send(error));
            }
      }
    },

    ///PROBANDO STORE PARA CREAR NUEVO PRODUCTO.
    store: (req, res, next) => {
      const products = products.findAll();
      products
        .then((products) => {
          let newProduct = {
            id: maxId(products),
            image: req.file.filename,
            ...req.body,
          };
          products.store(newProduct);
          res.redirect("/products/list_products")
        })
        .catch((err) => {
          res.send(err)
        });

      },

// Update - Form to edit

edit: (req, res) => {

  const produc_id = req.params.id;
  const product = Products.findByPk(produc_id, { include: ["ProductsCategorys","Brands","Colors"] });
  const categorys = Categorys.findAll();
  const brands = Brands.findAll();
  const colors = Colors.findAll();

  Promise.all([product, categorys, brands, colors])
    .then(function ([product, categorys, brands, colors]) {
      res.render("products/productEdit", {
        product,
        allCategorys:categorys,
        allbrands: brands,
        allcolors: colors,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.send(err);
    });
},
 'viewFormCreate': function(req, res){
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
    
    })
    .catch(function (err) {
      console.error(err);
      res.send(err);
    });

    },

    list: function(req, res){
      Products.findAll({
        include:[{association:"ProductsCategorys"}] 
    })
      .then(function(products){
        res.render('products/products',{products: products});
        
      })
},
   
    detail: (req, res)=>{
      Products.findByPk(req.params.id)
      .then((product) => {
        res.render('products/productDetail',{product: product});
      });

    },
    	// Update - Method to update
 
      update: (req, res)=>{
        const categorys = db.ProductsCategorys;
        const brands = db.Brands;
        const colors = db.Colors;
        const allCategorys = categorys.findAll()
        const allBrands = brands.findAll()
        const allColors = colors.findAll()
        const product =  db.Product.findByPk(req.params.id, 
          { include:[{association:"ProductsCategorys"},{association: "Colors"}, {association:"Brands"}] })


        
 //falta a imagen
        Products.update({
          name:req.body.name,
          stock:req.body.stock,
          product_code:req.body.product_code,
          price:req.body.price,
          description:req.body.description,
          color_id:req.body.color_id,
          status:req.body.status,
          category_id:req.body.category_id,
          brand_id:req.body.brand_id,
          create_date:req.body.create_date,
          //img_id: 'sin-img'
        },{
          where:{
              id: req.params.id
          }
        })
        Promise.all([product, allCategorys, allBrands, allColors])
        .then(function ([product, allCategorys, allColors, allBrands]) {
            res.render('products/productDetailAdmin',{ product, allCategorys, allColors, allBrands });
          
        })  
        .catch((error) => res.send(error));
    },


	destroy :(req, res) => {
    Products.destroy({
      where:{
          id: req.params.id
        }
    })
    
    .then(function(){
      res.redirect('/products/list_products');
    })

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