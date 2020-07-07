const usersCtrl = {};

const passport = require('passport');




const User = require('../models/user')

usersCtrl.rendersignupForm = (req, res) =>{
    res.render('users/register');
}

usersCtrl.signup =async (req, res) =>{
    const errors = [];
   const {username, password, confirm_password} = req.body;
   if(password != confirm_password){
      errors.push({text: 'Las contraseñas no coinciden'});
   }
   if(!req.body.username  || !req.body.password || !req.body.confirm_password){
    errors.push({text: 'Para registrar un empleado se deben completar todos los campos'});
   }

   if(errors.length>0){
       res.render('users/register',{
           errors,
           username,
           password,
           confirm_password
       })
   }else{
   const nickUser =  await User.findOne({username: username});
   if(nickUser){
       req.flash('error_msg', 'Este usuario ya esta registrado.');
       res.redirect('/register');
   }else{
       const newUser = new User({username, password});
       newUser.password = await newUser.encryptPassword(password)
       await newUser.save();
       req.flash('success_msg', 'Registrado Correctamente');
       res.redirect('/login');
   }
   }
}


usersCtrl.renderSigninForm = (req, res) =>{
    res.render('users/login');
}


usersCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/clients',
    failureFlash: true
})

usersCtrl.logout = (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Cierre de sesion correcto.');
    res.redirect('login');
}



module.exports = usersCtrl;