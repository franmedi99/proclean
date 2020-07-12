const adminCtrl = {};
const User = require('../models/user');
const Box = require('../models/empleado.caja');

adminCtrl.renderusers= async(req,res) =>{

        const users = await User.find();
         res.render('admins/users-list',{users});
    
    };


adminCtrl.renderbox= async(req,res) =>{
    const historial = await Box.find();
    res.render('admins/historial-box',{historial});
    
};





module.exports = adminCtrl;