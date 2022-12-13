const fs = require("fs");
const path = require("path");

function guestMiddleware (req, res, next){
        next();
    }
    

module.exports = guestMiddleware;