
let products = [
    {
        id:1,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/01-cel.png" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:2,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/02-cel.jpg" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:3,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/03-cel.jpg" ,
       title:"Samsung A2",
       price:"62.555",
       category:1,
    },
    {
       id:4,
       description:"producto diseñado para la mejor utilizacion",
       img:"../img/04-cel.jpg" ,
       alt:"Samsung 52",
       title:"Samsung 52",
       price:"$52.399",
    },
    {
        id:5,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/01-cel.png" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:6,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/02-cel.jpg" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:7,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/03-cel.jpg" ,
       title:"Samsung A2",
       price:"62.555",
       category:1,
    },
    {
       id:8,
       description:"producto diseñado para la mejor utilizacion",
       img:"../img/04-cel.jpg" ,
       alt:"Samsung 52",
       title:"Samsung 52",
       price:"$52.399",
    },
    {
        id:9,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/01-cel.png" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:10,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/02-cel.jpg" ,
        alt:"Ceular A32",
        title:"Samsung A32",
        price:"$69.600",
        category:1,
    },
    {
        id:11,
        description:"producto diseñado para la mejor utilizacion",
        img:"../img/03-cel.jpg" ,
       title:"Samsung A2",
       price:"62.555",
       category:1,
    },
    {
       id:12,
       description:"producto diseñado para la mejor utilizacion",
       img:"../img/04-cel.jpg" ,
       alt:"Samsung 52",
       title:"Samsung 52",
       price:"$52.399",
    },
    
];


const path = require('path');

let productsController = {
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