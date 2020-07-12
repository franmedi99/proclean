const indexCtrl = {};
const passport = require('passport');
const User = require('../models/user');

indexCtrl.renderindex = (req, res)=>{
        req.logout();
        res.redirect('login');
    
};



indexCtrl.rendersignupForm = (req, res) =>{
        res.render('users/register');
    }
    
    indexCtrl.signup =async (req, res) =>{
        const errors = [];
       const {username, password, confirm_password, rol} = req.body;
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
           const newUser = new User({username, password, rol});
           newUser.password = await newUser.encryptPassword(password)
           await newUser.save();
           req.flash('success_msg', 'Registrado Correctamente');
           res.redirect('/login');
       }
       }
    };
    
    
    indexCtrl.renderSigninForm = (req, res) =>{
        req.logout();
        res.render('users/login');
    }
    
    
    indexCtrl.signin = passport.authenticate('local',{
        failureRedirect: '/login',
        successRedirect: '/clients',
        failureFlash: true
    });
    
    indexCtrl.logout = (req, res) =>{
        req.logout();
        req.flash('success_msg', 'Cierre de sesion correcto.');
        res.redirect('login');
    };
    
    







module.exports = indexCtrl;