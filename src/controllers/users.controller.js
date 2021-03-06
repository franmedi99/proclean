const usersCtrl = {};
const Client = require('../models/client');
const Garage = require('../models/garage');
const Box = require('../models/empleado.caja');
const Auto = require('../models/auto.precios');
const Camioneta = require('../models/camioneta.precios');
const AutoGrande = require("../models/auto_grande.precios");
//---------------------------------------------CONTROLADORES GENERALES----------------------------------------------------
usersCtrl.renderClients = async (req, res) => {
    if (req.user.rol == "Administrador") {
        res.render('admins/admin-actions');
    } else {
        const clients = await Client.find({}, {
            patente: 1,
            _id: 1
        }).sort({
            "patente": 1
        });
        const box = await Box.aggregate([{
            $match: {
                user: req.user.username
            }
        }, {
            $match: {
                show: 1
            }
        }, {
            $group: {
                _id: null,
                box: {
                    $sum: "$box"
                }
            }
        }]);
        res.render('clients/client-actions', {
            clients,
            box
        });
    }
};

usersCtrl.findClient = async (req, res) => {
    const {
        patente
    } = req.body;
    const findClient = await Client.findOne({
        patente: patente
    });
    if (findClient) {

        if (findClient.tipo == "Auto_chico") {
            const precio = await Auto.findOne();
            const tipos = "Auto chico";
            res.render('clients/client-movement', {
                findClient,
                precio,
                tipos
            });
        } else if (findClient.tipo == "Auto_grande") {
            const precio = await AutoGrande.findOne();
            const tipos = "Auto grande";
            res.render('clients/client-movement', {
                findClient,
                precio,
                tipos
            });
        } else {
            const precio = await Camioneta.findOne();
            const tipos = "Camioneta";
            res.render('clients/client-movement', {
                findClient,
                precio,
                tipos
            });
        }
    } else {
        req.flash('error_msg', 'Cliente inválido.');
        res.redirect('/clients');
    }
};




usersCtrl.createNewClient = async (req, res) => {
    const {
        patente,
        marca,
        modelo,
        phone,
        cuenta,
        tipo
    } = req.body
    if (!req.body.patente || !req.body.marca || !req.body.modelo || !req.body.tipo) {

        req.flash('error_msg', 'La patente,marca,modelo y tipo son obligatorias para ingresar un nuevo cliente.');
        res.redirect('/clients');
    } else {
        const newClient = await new Client({
            patente,
            marca,
            modelo,
            phone,
            cuenta,
            tipo
        });
        await newClient.save();
        req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
        res.redirect('/clients');
    }
};


usersCtrl.closeBox = async (req, res) => {
    await Box.updateMany({
        user: req.user.username
    }, {
        $set: {
            show: 0
        }
    })
    req.flash('success_msg', 'Caja cerrada y Cierre de sesión satisfactorio');
    res.redirect('/login');

};


//----------------------------------------CONTROLADORES DE LAVADO----------------------------------------

usersCtrl.sendToBox = async (req, res) => {
    const {
        box,
        type,
        fecha,
        hora
    } = req.body
    const user = req.user.username;
    const action = "LAVADO";
    if (isNaN(box)) {
        req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
    } else {
        if (box > 0) {
            if (!req.body.box || !user || !req.body.type) {
                req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
                res.redirect('/clients');
            } else {
                const sendToBox = await new Box({
                    box,
                    user,
                    action,
                    type,
                    fecha,
                    hora
                });
                await sendToBox.save();
                req.flash('success_msg', 'Lavado Agregado satisfactoriamente');
                res.redirect('/clients');
            }


        } else {
            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
            res.redirect('/clients');
        }
    }

};





//-----------------------------------CONTROLADORES DE COCHERA-----------------------------------------


usersCtrl.sendToGarage = async (req, res) => {
    const {
        patente,
        marca,
        modelo,
        fecha,
        hora,
        tipo
    } = req.body

    const findClient = await Garage.findOne({
        patente: patente
    });
    if (findClient) {
        req.flash('error_msg', 'Este cliente ya esta registrado en la cochera.');
        res.redirect('/garage');
    } else {
        if (!req.body.patente || !req.body.marca || !req.body.modelo || !req.body.fecha || !req.body.hora || !req.body.tipo) {

            req.flash('error_msg', 'Ha ocurrido un error a la hora de ingresar el cliente a la cochera, por favor vuelva a intentarlo');
            res.redirect('/clients');
        } else {
            const newClient = await new Garage({
                patente,
                marca,
                modelo,
                fecha,
                hora,
                tipo
            });
            await newClient.save();
            req.flash('success_msg', 'Cliente agregado Satisfactoriamente');
            res.redirect('/garage');
        }
    }
};


usersCtrl.renderListGarage = async (req, res) => {
    const findCars = await Garage.find().sort({
        createdAt: 'desc'
    });
    res.render('clients/garage', {
        findCars
    });
};




usersCtrl.sendToBoxCar = async (req, res) => {
    const car = await Garage.findById(req.params.id);
    if (car) {
        if (car.tipo == "Auto") {
            const precio = await Auto.findOne();
            res.render('clients/egreso', {
                car,
                precio
            });
        } else {
            const precio = await Camioneta.findOne();
            res.render('clients/egreso', {
                car,
                precio
            });
        }

    } else {
        req.flash('error_msg', 'Ha ocurrido error por favor vuelva a intentarlo');
        res.redirect('/garage');
    }
};

usersCtrl.deleteofGarage = async (req, res) => {
    const {
        identi,
        box,
        type,
        fecha,
        hora
    } = req.body;
    console.log(req.body);
    const user = req.user.username;
    const action = "COCHERA";
    if (isNaN(box)) {
        req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
        res.redirect('/clients');
    } else {

        if (box > 0) {
            if (!req.body.box || !user || !req.body.type || !req.body.identi) {
                req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
                res.redirect('/clients');
            } else {
                const sendToBox = await new Box({
                    box,
                    user,
                    action,
                    type,
                    fecha,
                    hora
                })
                await sendToBox.save();
                await Garage.findByIdAndDelete(identi);
                req.flash('success_msg', 'Cliente egresado de la cochera satisfactoriamente');
                res.redirect('/clients');
            }


        } else {

            req.flash('error_msg', 'Ha ocurrido un error a la hora de enviar este dato, por favor vuelva a intentarlo.');
            res.redirect('/clients');
        }
    }
};




module.exports = usersCtrl;