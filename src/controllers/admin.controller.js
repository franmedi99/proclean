const adminCtrl = {};
const User = require('../models/user');
const Box = require('../models/empleado.caja');

adminCtrl.renderusers= async(req,res) =>{

        const users = await User.find();
         res.render('admins/users-list',{users});
    
    };


adminCtrl.renderbox= async(req,res) =>{
    const historial = await Box.find();
    const result = await Box.aggregate([{$match:{show:0}},{$group:{_id:null,box:{$sum:"$box"}}}]);
    res.render('admins/historial-box',{historial,result});
    
};





module.exports = adminCtrl;