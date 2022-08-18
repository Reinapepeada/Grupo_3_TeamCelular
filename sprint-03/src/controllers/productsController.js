const path = require('path');

const usersController = {
    index: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/products/products.html'))},
   
    detail: (req , res)=> {
        return res.sendFile(path.resolve(__dirname , '../views/products/productDetail.html'))},
        

}

module.exports = usersController;