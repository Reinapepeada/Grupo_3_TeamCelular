
let products = require('../../public/js/products')

const path = require('path');

let mainController = {
    products: products,
    list: function(req, res){
        
        res.render('index',{
            products: products,
        });
    },

    login: (req , res)=> {
        res.render('login');
        next();
    },

    register: (req , res)=> {
       
    },
    
    services: (req , res)=> {
        res.render('services')
    },
}
module.exports = mainController;