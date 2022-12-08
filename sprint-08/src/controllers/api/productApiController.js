const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)
let Products = db.Product;


const productsApiController = {
    listProducts: async (req, res) => 
    { console.log("Estoy productossss listar desde la api")
        const products = await Products.findAll();
        const newProductsArray = products.map( (product) => {
            return  {
                id: product.id,
                name:  product.name,
                category_id: product.category_id,
                detail: "/api/products/" + product.id
            }
           
        });
        return res.json({
            count: products.length,
            products: newProductsArray,
            
        });

    },
   
};

module.exports = productsApiController;