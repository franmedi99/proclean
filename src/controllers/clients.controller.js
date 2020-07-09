const clientsCtrl = {};
const Client = require('../models/client');
const Garage = require('../models/garage');
clientsCtrl.renderClients= async(req,res) =>{
    const clients = await Client.find({},{patente:1, _id:1});
    res.render('clients/client-actions',{clients});
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
    const newClient = await  new Client({patente,marca,modelo,phone,tipo});
    await newClient.save();
    req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
    res.redirect('/clients');
};

clientsCtrl.sendToGarage= async(req,res)=>{
    const{patente,marca,modelo,fecha,hora,tipo} = req.body

    const findClient =  await Garage.findOne({patente:patente});
    if(findClient){
        req.flash('error_msg', 'Este cliente ya esta registrado en la cochera.');
        res.redirect('/garage');
    }else{
    const newClient =  await new Garage({patente,marca,modelo,fecha,hora,tipo});
    await newClient.save();
    req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
    res.redirect('/garage');
}
}


clientsCtrl.renderListGarage=async(req,res) =>{
    const findCars =  await Garage.find();
    res.render('clients/garage',{findCars});
}



module.exports = clientsCtrl;