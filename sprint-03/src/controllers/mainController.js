
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

let mainController = {
    list: function(req, res){
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