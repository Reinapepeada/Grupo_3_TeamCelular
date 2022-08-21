
let products = require('../../public/js/products')
const path = require('path');

let productsController = {
    products: products,
    list: function(req, res){
   
        res.render('products/products',{products: products});
    },

    crear: function(){},
    
    detail: function(req,res){ 
      const idUrl = req.params.id;

      for(let product of products){
       
          if(parseInt(product.id) == parseInt(idUrl)){
            console.log('encontrado')
          
            res.render('det_prod',{product: product});
            next();
         }
     }
    }
}
module.exports = productsController;