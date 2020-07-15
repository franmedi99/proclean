const {Schema, model} =require('mongoose');

const CamionetaSchema= new Schema({
    mhora: {type:Number},
    hora: {type:Number},
    mdia: {type:Number},
    dia: {type:Number},
    semana: {type:Number},
    quincena: {type:Number},
    mes: {type:Number},

    lavado: {type:Number},
    motor: {type:Number},
    cuero: {type:Number},
    acrilico: {type:Number},
    tapizado: {type:Number},
    barro: {type:Number},
    lustre: {type:Number}

})

module.exports = model('Camioneta', CamionetaSchema);