const adminCtrl = {};
const User = require('../models/user');
const Box = require('../models/empleado.caja');
const Client = require('../models/client');
const Mes = require('../models/registro.mes');
const Anual = require('../models/registro.anual');
const Total = require('../models/registro.total');

//users
adminCtrl.renderusers= async(req,res) =>{
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
    const lavados = await Box.count({action:"LAVADO"});
    const cocheras = await Box.count({action:"COCHERA"});
    const result = await Box.aggregate([{$match:{show:0}},{$group:{_id:null,box:{$sum:"$box"}}}]);
    res.render('admins/historial-box',{historial,result,lavados,cocheras});
    
};

adminCtrl.editreceipt= async(req,res) =>{
    const receipt = await Box.findById(req.params.id);
    res.render('admins/edit-receipt', {receipt});
};

adminCtrl.updatereceipt = async(req,res)=>{
  
  const {user,action,type,box} =req.body;

  await Box.findByIdAndUpdate(req.params.id,{user,action,type,box});
  req.flash('success_msg', 'Registro Editado Satisfactoriamente');
  res.redirect('/list-box');
}








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
      const{ fecha,total,lavados,cocheras} = req.body;
      const sendmonth =  await new Mes({fecha,total,lavados,cocheras});
      await sendmonth.save();
      await Box.deleteMany( { show: 0 } );
      req.flash('success_msg', 'Dia cerrado Satisfactoriamente');
      res.redirect('/list-box');
      
      };

      adminCtrl.renderprices=async(req,res) =>{
        res.render('admins/price');
        };


        adminCtrl.editclient= async(req,res) =>{
          const client = await Client.findById(req.params.id);
          res.render('admins/edit-client', {client});
      };

      adminCtrl.updateclient = async(req,res)=>{
  
        const {marca,modelo,phone,patente,tipo} =req.body;
        await Client.findByIdAndUpdate(req.params.id,{marca,modelo,phone,patente,tipo});
        req.flash('success_msg', 'Cliente Editado Satisfactoriamente');
        res.redirect('/all-clients');
      }


      adminCtrl.deleteclient= async(req,res) =>{

        await Client.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Cliente Eliminado satisfactoriamente');
        res.redirect('/all-clients');
                   
        };


        adminCtrl.renderdays=async(req,res) =>{
         
          const historial = await Mes.find();
          const result = await Mes.aggregate([{$match:{}},{$group:{_id:null,total:{$sum:"$total"}}}]);
           console.log(result);
          res.render('admins/month-register',{historial,result});
          };

          adminCtrl.closemonth=async(req,res) =>{
            const{ fecha , total} = req.body;
            const sendmonth =  await new Anual({fecha,total});
            await sendmonth.save();
            await Mes.deleteMany();
            req.flash('success_msg', 'Mes cerrado Satisfactoriamente');
            res.redirect('/list-box');
            
            };

            adminCtrl.rendermonths=async(req,res) =>{
         
              const historial = await Anual.find({show:1});
              const result = await Anual.aggregate([{$match:{show:1}},{$group:{_id:null,total:{$sum:"$total"}}}]);
              res.render('admins/year-register',{historial,result});
              };

              adminCtrl.closemonths=async(req,res) =>{
                const{ fecha , total} = req.body;
                const sendmonth =  await new Total({fecha,total});
                await sendmonth.save();
                await Anual.updateMany({show:1},{ $set: { show: 0 } })
                req.flash('success_msg', 'Mes cerrado Satisfactoriamente');
                res.redirect('/list-box');
                
                };


                adminCtrl.renderyears=async(req,res) =>{
         
                  const historial = await Total.find();
                  const result = await Total.aggregate([{$match:{}},{$group:{_id:null,total:{$sum:"$total"}}}]);
                  res.render('admins/total-register',{historial,result});
                  };


      
module.exports = adminCtrl;