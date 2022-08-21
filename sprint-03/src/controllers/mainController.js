
let products = require('../../public/js/products')

const path = require('path');

let mainController = {
    products: products,
    list: function(req, res){
        console.log('hfksdjfsalkjfskljflsfjlskdafjsl')
        res.render('index',{
            products: products,
        });
    },

    login: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/login.html'))
    },
    
    services: (req , res)=> {
        res.render('services')
    },
}
module.exports = mainController;