function recordame (req, res, next){
    if( req.cookies.recordame != undefined && req.session.userLogged == undefined) {
        const userToLogin = users.find(oneUser => oneUser.email === req.cookies.recordame);
        
		if(userToLogin){
            delete userToLogin.password;
            req.session.userLogged= userToLogin;
			res.redirect('/');
        }
    }
    next();
    }

module.exports = recordame;