const adminCtrl = {};
const User = require('../models/user');
const Box = require('../models/empleado.caja');
const Client = require('../models/client');



const Mes = require('../models/registro.mes');
//users
adminCtrl.renderusers= async(req,res) =>{
        console.log(req.user.id);
        const users = await User.find();
         res.render('admins/users-list',{users});
    
    };

adminCtrl.deleteuser= async(req,res) =>{
  if (req.params.id ==req.user.id) {
    req.flash('error_msg', 'Por medidas de seguridad usted no puede borrarse a si mismo.');
    res.redirect('/list-users');
  }else{
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Usuario borrado Satisfactoriamente');
     res.redirect('/list-users');
  }

    
};


//box
adminCtrl.renderbox= async(req,res) =>{
    const historial = await Box.find({ show: 0 });
    const result = await Box.aggregate([{$match:{show:0}},{$group:{_id:null,box:{$sum:"$box"}}}]);
    res.render('admins/historial-box',{historial,result});
    
};

adminCtrl.editreceipt= async(req,res) =>{
    const receipt = await Box.findById(req.params.id);
    res.render('admins/edit-receipt', {receipt});
};

adminCtrl.deletereceipt= async(req,res) =>{

await Box.findByIdAndDelete(req.params.id);
req.flash('success_msg', 'Recibo Borrado satisfactoriamente');
res.redirect('/list-box');
   
  

};



adminCtrl.renderclients=async(req,res) =>{

    const clients = await Client.find();
    res.render('admins/client-list',{clients});
    
    };

    adminCtrl.closeday=async(req,res) =>{
      const{ fecha , total} = req.body;
      const sendmonth =  await new Mes({fecha,total});
      await sendmonth.save();
      await Box.deleteMany( { show: 0 } );
      req.flash('success_msg', 'Dia cerrado Satisfactoriamente');
      res.redirect('/list-box');
      
      };


module.exports = adminCtrl;