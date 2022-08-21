
let products = require('../../public/js/products')
const path = require('path');

let productsController = {
    products: products,
    
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

    
    create: function(){

    },
    
   
    detail: function(req,res){ 
      
    },

}
module.exports = productsController;