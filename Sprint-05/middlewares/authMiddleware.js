const fs = require("fs");
const path = require("path");

function authMiddleware (req, res, next){
    if( req.session.userLogged == undefined) {
			res.redirect('/users/login');
        }
        next();
    }
    

module.exports = authMiddleware;