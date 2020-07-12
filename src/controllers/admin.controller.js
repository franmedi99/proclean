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

adminCtrl.deleteuser= async(req,res) =>{
  
   await User.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Usuario borrado Satisfactoriamente');
    res.redirect('/list-users');
    
};



module.exports = adminCtrl;