const fs = require("fs");
const path = require("path");

const logpath = path.resolve(__dirname, '../log.txt');

function middlewareRutas (req, res, next){

       fs.appendFileSync(logpath, "El usuario paso por acá a la hora "  + '\n' );
        next();
}

module.exports = middlewareRutas;