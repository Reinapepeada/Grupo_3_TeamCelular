const express = require("express");
const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/productsController");
const { body } = require("express-validator");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: (req, file, cb) => {
        // extrae el nombre de la extencion de un archivo
        const newFilename =
            "product-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    },
});
const upload = multer({ storage: storage });
var router = express.Router();

const validationProducts = [
    body("nombre")
      .isLength({min:2})
      .withMessage("El nombre de producto debe tener mas de 2 caracteres."),
    body("category_id")
      .isInt()
      .withMessage("Seleccione una categoría."),
    body("precio")
      .isFloat()
      .withMessage("El precio debe ser un decimal."),
    body("stock")
      .isInt()
      .withMessage("El stock debe ser un entero."),
    body("codigoProducto")
      .isLength({min:4})
      .withMessage("El numero de serie debe tener mas de 4 caracteres."),
    body("descripcion")
      .isLength({min:20})
      .withMessage("Debes completar una descripción al menos con 20 caracteres"),
      body("color_id")
      .isInt()
      .withMessage("Seleccione una color de producto"),
      body("status")
      .isInt()
      .withMessage("Seleccione un estatus del producto."),
      body("brand_id")
        .isInt()
        .withMessage("Seleccione una marca de producto."),
      body("img_id")
        .isEmpty()
        .withMessage("Suba una foto de su producto")
];

const validationEditProducts = [
  body("name")
    .isLength({min:2})
    .withMessage("El nombre de producto debe tener mas de 2 caracteres."),
  body("category_id")
    .isInt()
    .withMessage("Seleccione una categoría."),
  body("price")
    .isFloat()
    .withMessage("El precio debe ser un decimal."),
  body("product_code")
    .isLength({min:1})
    .withMessage("El numero de serie debe tener mas de 4 caracteres."),
  body("description")
    .isLength({min:20})
    .withMessage("Debes completar una descripción al menos con 20 caracteres."),
    body("color_id")
    .isInt()
    .withMessage("Seleccione una color de producto"),
    body("status")
    .isInt()
    .withMessage("Seleccione un estatus del producto."),
    body("brand_id")
      .isInt()
      .withMessage("Seleccione una marca de producto."),
];

router.post(
    "/create",
    upload.single("img_id"),
    validationProducts,
    productsController.create
);

router.get("/create", productsController.viewFormCreate);

//ejecuto multer

router.get("/list_products", productsController.list_products);
router.get("/search", productsController.search);

router.get("/:id", productsController.detail);
router.get("/", productsController.list);
router.get("/details", productsController.detail);
router.get("/details/:id", productsController.detail);
router.delete("/delete/:id", productsController.destroy);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);

router.put("/upload/:id", upload.single("img_id"),validationEditProducts, productsController.update);

//router.put('/upload/:id', productsController.update);

module.exports = router;
