function userLoggedMiddleware (req, res, next){
    res.locals.isAnUserLogged = false;
    if(req.session.userLogged != undefined){
        res.locals.isAnUserLogged = true;
        res.locals.userLogged = req.session.userLogged;

    }
    console.log (res.locals.userLogged);
    next ();

}

module.exports = userLoggedMiddleware;