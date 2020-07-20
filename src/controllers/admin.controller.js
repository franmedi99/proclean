const adminCtrl = {};
const User = require('../models/user');
const Box = require('../models/empleado.caja');
const Client = require('../models/client');
const Mes = require('../models/registro.mes');
const Anual = require('../models/registro.anual');
const Total = require('../models/registro.total');
const Auto = require('../models/auto.precios');
const AutoGrande= require("../models/auto_grande.precios");
const Camioneta = require('../models/camioneta.precios');
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
    const historial = await Box.find({ show: 0 }).sort({createdAt: 'asc'});
    const lavados = await Box.countDocuments({action:"LAVADO",show:0});
    const cocheras = await Box.countDocuments({action:"COCHERA",show:0});
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





//.sort({createdAt: 'desc'});


adminCtrl.deletereceipt= async(req,res) =>{

await Box.findByIdAndDelete(req.params.id);
req.flash('success_msg', 'Recibo Borrado satisfactoriamente');
res.redirect('/list-box');
   
  

};



adminCtrl.renderclients=async(req,res) =>{

    const clients = await Client.find().sort({"patente": 1});
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
          const lavados = await Mes.aggregate([{$match:{}},{$group:{_id:null,lavados:{$sum:"$lavados"}}}]);
          const cocheras = await Mes.aggregate([{$match:{}},{$group:{_id:null,cocheras:{$sum:"$cocheras"}}}]);
          const historial = await Mes.find().sort({createdAt: 'desc'});
          const result = await Mes.aggregate([{$match:{}},{$group:{_id:null,total:{$sum:"$total"}}}]);
           console.log(lavados);
           console.log(cocheras);
          res.render('admins/month-register',{historial,result,lavados,cocheras});
          };

          adminCtrl.closemonth=async(req,res) =>{

            const{fecha,total,lavados,cocheras} = req.body;
            console.log(req.body);
            const sendmonth=  await new Anual({fecha,total,lavados,cocheras});
            await sendmonth.save();
            await Mes.deleteMany();
            req.flash('success_msg', 'Mes cerrado Satisfactoriamente');
            res.redirect('/list-box');
            
            };

            adminCtrl.rendermonths=async(req,res) =>{
              const lavados = await Anual.aggregate([{$match:{}},{$group:{_id:null,lavados:{$sum:"$lavados"}}}]);
              const cocheras = await Anual.aggregate([{$match:{}},{$group:{_id:null,cocheras:{$sum:"$cocheras"}}}]);
              const historial = await Anual.find({show:1}).sort({createdAt: 'desc'});;
              const result = await Anual.aggregate([{$match:{show:1}},{$group:{_id:null,total:{$sum:"$total"}}}]);
              res.render('admins/year-register',{historial,result,lavados,cocheras});
              };

              adminCtrl.closemonths=async(req,res) =>{
                const{ fecha , total,lavados,cocheras} = req.body;
                const sendmonth =  await new Total({fecha,total,lavados,cocheras});
                await sendmonth.save();
                await Anual.updateMany({show:1},{ $set: { show: 0 } })
                req.flash('success_msg', 'Año cerrado Satisfactoriamente');
                res.redirect('/list-box');
                
                };


                adminCtrl.renderyears=async(req,res) =>{
         
                  const historial = await Total.find().sort({createdAt: 'desc'});;
                  const result = await Total.aggregate([{$match:{}},{$group:{_id:null,total:{$sum:"$total"}}}]);
                  res.render('admins/total-register',{historial,result});
                  };



                  adminCtrl.oldmonths=async(req,res) =>{
                      const months=  await Anual.find({show:0}).sort({createdAt: 'desc'});;
                      res.render('admins/old-month',{months});
                    };
  
                    adminCtrl.renderprices=async(req,res) =>{
                      const preciosA = await Auto.findOne();
                      const preciosC = await Camioneta.findOne();
                      res.render('admins/price',{preciosA,preciosC});
                      };




                      adminCtrl.sendAutos=async(req,res) =>{
                        const{lavado,motor,cuero,acrilico} = req.body;
                        const precio = await Auto.find();
                     
                        if(precio !=""){
                        await Auto.deleteMany({});
                        const precios1 =  await new Auto({lavado,motor,cuero,acrilico});
                        await precios1.save();
                        req.flash('success_msg', 'Precios de autos modificados Satisfactoriamente');
                        res.redirect('/price');
                        }else{
                          
                          const precios2 =  await new Auto({lavado,motor,cuero,acrilico});
                          await precios2.save();
                          req.flash('success_msg', 'Precios de autos creados Satisfactoriamente');
                          res.redirect('/price');
                        }

                        };

                        adminCtrl.sendAutosGrandes=async(req,res) =>{
                          const{lavado,motor,cuero,acrilico} = req.body;
                          const precio = await AutoGrande.find();
                       //mhora,hora,mdia,dia,semana,quincena,mes,
                          if(precio !=""){
                          await AutoGrande.deleteMany({});
                          const precios1 =  await new AutoGrande({lavado,motor,cuero,acrilico});
                          await precios1.save();
                          req.flash('success_msg', 'Precios de autos modificados Satisfactoriamente');
                          res.redirect('/price');
                          }else{
                            
                            const precios2 =  await new AutoGrande({lavado,motor,cuero,acrilico});
                            await precios2.save();
                            req.flash('success_msg', 'Precios de autos creados Satisfactoriamente');
                            res.redirect('/price');
                          }
  
                          };
  





                        adminCtrl.sendCamionetas=async(req,res) =>{
                          const{lavado,motor,cuero,acrilico} = req.body;
                          const precio = await Camioneta.find();
                       // mhora,hora,mdia,dia,semana,quincena,mes,
                          if(precio !=""){
                          await Camioneta.deleteMany({});
                          const precios1 =  await new Camioneta({lavado,motor,cuero,acrilico});
                          await precios1.save();
                          req.flash('success_msg', 'Precios de camionetas modificados Satisfactoriamente');
                          res.redirect('/price');
                          }else{
                            
                            const precios2 =  await new Camioneta({lavado,motor,cuero,acrilico});
                            await precios2.save();
                            req.flash('success_msg', 'Precios de camionetas creados Satisfactoriamente');
                            res.redirect('/price');
                          }
  
                          };




      
module.exports = adminCtrl;