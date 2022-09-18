let express = require('express')
let app = express() //instancio en el objeto app 

var usuarioLogued = require('./middlewares/userLoggedMiddleware')


let path = require('path')
//path es un modulo nativo que le dice donde estoy ya que las rutas son obsoluta
//__dirname es una variable que nos da node que muestra donde estoy parado , en el archivo que estoy

let session = require('express-session')

app.use(session({
    secret: "secret-secret by group 3",
    resave: false,
    saveUninitialized: false,
}));


//static recibe como parametro la ruta en la que se encuentran los archivos public
// y a donde quiero llegar
let publicPath = path.resolve(__dirname,'./public')
// este metodo me da la ruta en donde estoy
//le digo a express que la carpeta public este disponible
app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//para enviar info por formularios
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//app.use('/scripts', express.static(_dirname, + 'app.js'));

app.listen(3000,()=>{
    console.log('Se levanto en el puerto 3000 🎈.')
})

const productsRouter = require("./src/routes/products");
const mainRouter = require("./src/routes/main");
const cartRouter = require("./src/routes/cart");
const userRouter = require("./src/routes/user");


// rutas


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(usuarioLogued)
app.use('/products', productsRouter);
app.use('/', mainRouter);
app.use('/login', mainRouter);
app.use('/register', mainRouter);
app.use('/services', mainRouter);
app.use('/cart', cartRouter);
app.use('/users', userRouter);