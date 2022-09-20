const fs = require("fs");
const path = require("path");

function guestMiddleware (req, res, next){
   /* if( req.session.userLogged != undefined) {
			if(req.session.userLogged.category == "user"){
                (res.redirect('/'))
                next();
            }else{
                (res.redirect('/products/list_products'))
                next();
            }
     }*/
    next();
}
module.exports = guestMiddleware;