function authMiddleware (req, res, next) {
    if(req.session.userLogged) {
        next();
    } else {
        console.log("Debes loguearte para entrar a esta URL");
        res.redirect("/login");
    }
    
}

module.exports = authMiddleware;