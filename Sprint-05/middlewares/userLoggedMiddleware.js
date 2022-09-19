function userLoggedMiddleware (req, res, next){
    res.locals.isAnUserLogged = false;

    console.log('se ejecuta el middleware userlogged sin session')
    
    if(req.session.userLogged != undefined){
        res.locals.isAnUserLogged = true;
        res.locals.userLogged = req.session.userLogged;
        console.log('sesion is logged')

        console.log(res.locals.isAnUserLogged)
        console.log('se ejecuta el middleware userlogged session')
    }
    console.log (res.locals.userLogged);
    next ();

}

module.exports = userLoggedMiddleware;