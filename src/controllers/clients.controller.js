const clientsCtrl = {};
const Client = require('../models/client');
const Garage = require('../models/garage');
const Box = require('../models/empleado.caja');
clientsCtrl.renderClients= async(req,res) =>{
    const clients = await Client.find({},{patente:1, _id:1});
    const box = await Box.aggregate([{$group:{_id:null,box:{$sum:"$box"}}}]);;
    res.render('clients/client-actions',{clients, box});
};

clientsCtrl.findClient= async(req,res) =>{
    const {patente} = req.body;
    const findClient =  await Client.findOne({patente:patente});
    if(findClient){
        res.render('clients/client-movement',{findClient});
    }else{
        req.flash('error_msg', 'Cliente inválido.');
        res.redirect('/clients');
    }
};

clientsCtrl.createNewClient= async (req,res) =>{
    const{patente,marca,modelo,phone,tipo} = req.body
    if(!req.body.patente || !req.body.marca || !req.body.modelo || !req.body.tipo){
 
    req.flash('error_msg', 'la patente,marca,modelo y tipo son obligatorias para ingresar un nuevo cliente.');
    res.redirect('/clients');
}else{
    const newClient = await  new Client({patente,marca,modelo,phone,tipo});
    await newClient.save();
    req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
    res.redirect('/clients');
}
};

clientsCtrl.sendToGarage= async(req,res)=>{
    const{patente,marca,modelo,fecha,hora,tipo} = req.body

    const findClient =  await Garage.findOne({patente:patente});
    if(findClient){
        req.flash('error_msg', 'Este cliente ya esta registrado en la cochera.');
        res.redirect('/garage');
    }else{
        if(!req.body.patente || !req.body.marca || !req.body.modelo || !req.body.fecha|| !req.body.hora|| !req.body.tipo){
 
            req.flash('error_msg', 'Ha ocurrido un error a la hora de ingresar el cliente a la cochera, por favor vuelva a intentarlo');
            res.redirect('/clients');
        }else{
    const newClient =  await new Garage({patente,marca,modelo,fecha,hora,tipo});
    await newClient.save();
    req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
    res.redirect('/garage');
}
}
}


clientsCtrl.renderListGarage=async(req,res) =>{
    const findCars =  await Garage.find();
    res.render('clients/garage',{findCars});
}

clientsCtrl.sendToBox=async(req,res) =>{
    const{box,type, fecha, hora} = req.body
    const egreso = req.body.fecha+" "+req.body.hora;
    const user = req.user.username;
    const action = "LAVADO";
    if (isNaN(box)) {
        req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
}else{
    if(box>0){
        if (!req.body.box||!user||!req.body.type ) {
            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
            res.redirect('/clients');
        }else{
        const sendToBox =  await new Box({box, user,action,type, egreso});
        await sendToBox.save();
        req.flash('success_msg', 'Lavado Agregado satisfactoriamente');
        res.redirect('/clients');
    }


}else{
            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
}
}
    
}


clientsCtrl.sendToBoxCar=async(req,res) =>{
        const car = await Garage.findById(req.params.id);
        res.render('clients/egreso', {car});

    
}

clientsCtrl.deleteofGarage=async(req,res) =>{
    const{identi, box,type, fecha , hora} = req.body;
    const egreso = req.body.fecha+" "+req.body.hora;
    const user = req.user.username;
    const action = "COCHERA";
    if (isNaN(box)) {
        req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
}else{

    if(box>0){
        if (!req.body.box||!user||!req.body.type || !req.body.identi ) {
            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
            res.redirect('/clients');
        }else{            
        const sendToBox =  await new Box({box, user,action,type, egreso})
        await sendToBox.save();
        await Garage.findByIdAndDelete(identi);
        req.flash('success_msg', 'Cliente egresado satisfactoriamente');
        res.redirect('/clients');
    }


}else{
  
            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
}
}
}




module.exports = clientsCtrl;