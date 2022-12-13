const fs = require("fs");
const multer = require("multer");
const { json } = require("body-parser");
const path = require("path");
//////////
//let productsFilePath = path.join(__dirname, '../../data/products.json');
//let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//let products = require('../../public/js/products')

const { validationResult, body } = require("express-validator");

let modelPath = path.join(__dirname, "../database/models");
let db = require(modelPath);
let Products = db.Product;
let Categorys = db.ProductsCategorys;
let Brands = db.Brands;
let Colors = db.Colors;

//abro el products.json y lo convierto a javascript con parse
//const jsonData = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))

let productsController = {
    list_products: function (req, res) {
        console.log('list product')
        Products.findAll({
            include: [
                { association: "ProductsCategorys" },
                { association: "Colors" },
                { association: "Brands" },
            ],
        }).then(function (products) {
            res.render("products/list_products", { products: products });
        });
        //    res.render('products/list_products',{products: jsonData})
    },

    ///PROBANDO CREATE NUEVO PARA CREAR PRODUCTO.
    create: (req, res) => {
        console.log('create')
        let image = req.file
            ? req.file.filename
            : req.params.id != "-1"
                ? req.params.id
                : "default.png";
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            const categorys = db.ProductsCategorys;
            const brands = db.Brands;
            const colors = db.Colors;
            const categorysAll = categorys.findAll();
            const brandsAll = brands.findAll();
            const colorsAll = colors.findAll();

            Promise.all([categorysAll, brandsAll, colorsAll])
                .then(function ([categorysAll, brandsAll, colorsAll]) {

                    res.render("products/productCreate", {
                        categorysAll,
                        brandsAll,
                        colorsAll,
                        errors: errors.array(),
                    });
                })
                .catch(function (err) {
                    console.error(err);
                    res.send(err);
                });
        } else {
            Products.create({
                name: req.body.nombre,
                description: req.body.descripcion,
                price: req.body.precio,
                stock: req.body.stock,
                product_code: req.body.codigoProducto,
                status: req.body.status,
                category_id: req.body.category_id,
                brand_id: req.body.brand_id,
                color_id: req.body.color_id,
                create_date: Date.now(),
                img_id: image,
            })
                .then((product) => {
                    res.redirect("/products/list_products");
                })
                .catch((error) => res.send(error));
        }
    },
    // Update - Form to edit

    edit: (req, res) => {
        console.log('edit')
        const produc_id = req.params.id;
        const product = Products.findByPk(produc_id, {
            include: ["ProductsCategorys", "Brands", "Colors"],
        });
        const categorys = Categorys.findAll();
        const brands = Brands.findAll();
        const colors = Colors.findAll();

        Promise.all([product, categorys, brands, colors])
            .then(function ([product, categorys, brands, colors]) {
                res.render("products/productEdit", {
                    product,
                    allCategorys: categorys,
                    allBrands: brands,
                    allColors: colors,
                });
            })
            .catch(function (err) {
                console.error(err);
                res.send(err);
            });
    },
    viewFormCreate: function (req, res) {
        console.log('view form create')
        const categorys = db.ProductsCategorys;
        const brands = db.Brands;
        const colors = db.Colors;
        const categorysAll = categorys.findAll();
        const brandsAll = brands.findAll();
        const colorsAll = colors.findAll();

        Promise.all([categorysAll, brandsAll, colorsAll])
            .then(function ([categorysAll, brandsAll, colorsAll]) {
                res.render("products/productCreate", {
                    categorysAll,
                    brandsAll,
                    colorsAll,
                });
            })
            .catch(function (err) {
                console.error(err);
                res.send(err);
            });
    },

    list: function (req, res) {
        console.log('list')
        Products.findAll({
            include: [{ association: "ProductsCategorys" }],
        }).then(function (products) {
            res.render("products/products", { products: products });
        });
    },

    detail: async(req, res) => {
        console.log('detail')
        await Products.findByPk(req.params.id).then((producto) => {
            console.log(producto)
           
           // res.render("products/productDetail", { product: product });
        });
     
    },
    // Update - Method to update

    update: (req, res) => {

        const categorys = db.ProductsCategorys;
        const brands = db.Brands;
        const colors = db.Colors;
        const allCategorys = categorys.findAll();
        const allBrands = brands.findAll();
        const allColors = colors.findAll();
        const product = db.Product.findByPk(req.params.id, {
            include: [
                { association: "ProductsCategorys" },
                { association: "Colors" },
                { association: "Brands" },
            ],
        });
        let image = req.file ? req.file.filename : product.img_id;

        //falta a imagen
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            Promise.all([product, allCategorys, allBrands, allColors])
                .then(function ([product, allCategorys, allColors, allBrands]) {
                    return res.render("products/productEdit", {
                        product,
                        allCategorys,
                        allColors,
                        allBrands,
                        errors: errors.array()
                    });
                })   
            }
            else {
                const newProduct = Products.update(
                    {
                        name: req.body.name,
                        stock: req.body.stock,
                        product_code: req.body.product_code,
                        price: req.body.price,
                        description: req.body.description,
                        color_id: req.body.color_id,
                        status: req.body.status,
                        category_id: req.body.category_id,
                        brand_id: req.body.brand_id,
                        img_id: image,
                        create_date: req.body.create_date,
                    },
                    
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                    
                    );
                    
                    Promise.all([product, allCategorys, allBrands, allColors])
                    .then(function ([product, allCategorys, allColors, allBrands]) {
                        
                     
                  /*  res.render("products/productDetailAdmin", {
                        product,
                        allCategorys,
                        allColors,
                        allBrands,
                    });
                    */
                })
                .catch((error) => res.send(error));
            }
            res.redirect('/products/details/'+req.params.id)
    },

    destroy: (req, res) => {
        console.log('destroy')
        Products.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(function () {
                res.redirect("/products/list_products");
            });
    },
    search: function (req, res) {
        let nuevoArray = [];
        let valueIn;
        valueIn = req.query.search.toLowerCase();

        for (let i = 0; i < products.length; i++) {
            console.log(products[i].name.toLowerCase().search(valueIn) != -1);
            if (products[i].name.toLowerCase().search(valueIn) != -1) {
                nuevoArray.push(products[i]);

                console.log("valor para array");
                console.log(products[i].name);
            }
        }

        console.log(nuevoArray);

        if (nuevoArray.length > 0) {
            res.render("products/filter_products", {
                products: nuevoArray,
                msg: "Resultados de la búsqueda",
            });
        } else {
            res.render("products/list_products", {
                products: jsonData,
                msg: "No hubo resultados para la búsqueda indicada",
            });
        }
    },
};

module.exports = productsController;
