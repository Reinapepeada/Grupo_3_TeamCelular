//let products = require('../../public/js/products')
const fs = require("fs");
const multer = require("multer");
const { json } = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");

let modelPath = path.join(__dirname, "../database/models");
let db = require(modelPath);
let Users = db.Users;

let Products = db.Product;

const { validationResult } = require("express-validator");
const { query } = require("express");



let mainController = {
    list: function (req, res) {
        Products.findAll({
            include: [{ association: "ProductsCategorys" }],
        }).then(function (products) {
            res.render("index", { products: products });
        });

    },

    login: (req, res) => {
        res.render("login");
    },

    loginEntry: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.render("login", {
                errors: errors.array(),
                old: req.body,
            });
        }

        Users.findOne({
            // attributes:['id', 'full_name'], //Campos que quiero traer de la tabla User, si pongo user_category se rompe la query asique sigo trabajando en ello.
            where: {
                email: req.body.email,
            },
            include: [{ association: "UserCategorys" }],
        })
            .then((userToLogin) => {
                const passwordVerificar = bcrypt.compareSync(
                    req.body.password,
                    userToLogin.password
                );
                
                if (passwordVerificar) {
                    req.session.userLogged = {
                        //dando estructura
                        id: userToLogin.id,
                        full_name: userToLogin.full_name,
                        //last_name: userToLogin.last_name,
                        email: userToLogin.email,
                        profile_image: userToLogin.profile_image,
                        //users_category: users_category
                    };
                    //Cookie

                    if (req.body.recordame) {
                        res.cookie("recordame", req.session.userLogged.email, {
                            maxAge: 120000,
                        });
                    }

                    return res.redirect("/");
                }

                return res.render("login", {
                  errors: [
                       {
                          msg: "No se pueden validar los datos ingresados.",
                      },
                  ]},
              );
            })

            .catch((e) => {
                
                return res.render("login", {
                    errors: [
                         {
                            msg: "No se pueden validar los datos ingresados.",
                        },
                    ]},
                );
            });
    },
    services: (req, res) => {
        function addAnotherIssue() {
            const contenedor = document.querySelector(".anotherIssue");
            contenedor.innerHTML = "<input >";
        }

        res.render("services");
    },
};
module.exports = mainController;
