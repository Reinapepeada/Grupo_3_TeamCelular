const { send } = require("process");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

let modelPath = path.join(__dirname, "../../database/models");
let db = require(modelPath);

const productsApiController = {
  listProducts: async (req, res) => {
    const products = await db.Product.findAll({
      include: [
        {
          association: "ProductsCategorys",
        },
      ],
    });

    const [Celulares, Fundas, Tablet] = await Promise.all([  // aqui harcodee las categorias, podriamos llamarlas.
      db.Product.findAll({
        include: [
          {
            association: "ProductsCategorys",
            where: {
              name: "Celulares",
            },
          },
        ],
      }),

      db.Product.findAll({
        include: [
          {
            association: "ProductsCategorys",
            where: {
              name: "Fundas",
            },
          },
        ],
      }),

      db.Product.findAll({
        include: [
          {
            association: "ProductsCategorys",
            where: {
              name: "Tablet",
            },
          },
        ],
      }),
    ]);

    const newProductsArray = products.map((product) => {
      return {
        id: product.id,
        name: product.fullname,
        description: product.description,
        category: product.category_id,
        detail: "/api/products/" + product.id,
      };
    });

    return res.json({
      count: newProductsArray.length,
      countByCategory: {
        CelularesCount: Celulares.length,
        FundasCount: Fundas.length,
        TabletCount: Tablet.length,
      },
      products: [...newProductsArray],
    });
  },

  detail: async (req, res) => {
    let productToFind = req.params.id;
    const product = await db.Product.findByPk(productToFind, {
      include: [{ association: "ProductsCategorys" }],
    });
    return res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      product_code: product.product_code,
      color: product.color_id,
      brand_id: product.brand_id,
      price: product.price,
      picture: product.img_id,
      category: product.category_id,
      create_date: product.create_date,
      detail: "/api/products/" + product.id,
      //Falta hacer la consulta para obtener el array con todas las relaciones 1 a muchos que hay!! (Working VP)
    });
  },
};

module.exports = productsApiController;
