const adminCtrl = {};
const User = require('../models/user');
const Garage = require('../models/garage');
const Box = require('../models/empleado.caja');

adminCtrl.renderusers= async(req,res) =>{

        const users = await User.find();
         res.render('admins/users-list',{users});
    
    };






module.exports = adminCtrl;