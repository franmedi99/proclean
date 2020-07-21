const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        return next();
    }
    req.flash('error_msg', 'No estas autorizado a ver esa seccion');
    res.redirect('/login');
}

helpers.isAdmin = (req, res, next) => {
    if (req.user.rol == "Administrador") {

        return next();
    }
    req.flash('error_msg', 'No estas autorizado a ver esa seccion');
    res.redirect('/login');
}


module.exports = helpers;