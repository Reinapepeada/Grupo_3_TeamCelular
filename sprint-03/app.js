let express = require('express')
let app = express() //instancio en el objeto app 
let path = require('path')
//path es un modulo nativo que le dice donde estoy ya que las rutas son obsoluta
//__dirname es una variable que nos da node que muestra donde estoy parado , en el archivo que estoy


//static recibe como parametro la ruta en la que se encuentran los archivos public
// y a donde quiero llegar
let publicPath = path.resolve(__dirname,'./public')
                    // este metodo me da la ruta en donde estoy
                    //le digo a express que la carpeta public este disponible
app.use(express.static(publicPath))


//app.use('/scripts', express.static(_dirname, + 'app.js'));

app.listen(3000,()=>{
    console.log('Se levanto en el puerto 3000 🎈.')
})

const productsRouter = require("./src/routes/products")
const mainRouter = require("./src/routes/main")
// rutas

app.use('/products', productsRouter);
app.use('/', mainRouter);
app.use('/login', mainRouter);
app.use('/services', mainRouter);


/*

app.get('/', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/index.html');
    res.sendFile(htmlPath);
 })
 app.get('/register', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/register.html');
    res.sendFile(htmlPath);
 })
 app.get('/login', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/login.html');
    res.sendFile(htmlPath);
 })
app.get('/products', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/products/products.html');
    res.sendFile(htmlPath);
 })
app.get('/create-acount', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./views/crearCuenta.html');
    res.sendFile(htmlPath);
 })
 app.get('/cart', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/carrito.html');
    res.sendFile(htmlPath);
 })
 app.get('/services', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/services.html');
    res.sendFile(htmlPath);
 })

app.get('/products/details', (req, res)=>{ 
    let htmlPath  = path.join(__dirname,'./src/views/products/productDetail.html');
    res.sendFile(htmlPath);
})
*/

/*
let productos = require('./productos')

let productosObject = {
productos: productos,

listProductos: function () {
    let container = document.getElementById('productos')
    this.productos.forEach((producto, indice) => {
        
        let card = document.createElement('div')
        div.text = producto.name
       res.json(producto);
        container.appendChild(card)
       <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
         </div>
        
        console.log(
           producto.name ,
           producto.price
        );
    });
},
}
console.log(productosObject)*/

 
