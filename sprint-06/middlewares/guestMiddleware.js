const fs = require("fs");
const path = require("path");

function guestMiddleware (req, res, next){
    if( req.session.userLogged != undefined) {
			res.redirect('/');
        }
        next();
    }
    

module.exports = guestMiddleware;