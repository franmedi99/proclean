const {Schema, model} =require('mongoose');

const AutoSchema= new Schema({
    // mhora: {type:Number},
    // hora: {type:Number},
    // mdia: {type:Number},
    // dia: {type:Number},
    // semana: {type:Number},
    // quincena: {type:Number},
    // mes: {type:Number},

    lavado: {type:Number},
    motor: {type:Number},
    cuero: {type:Number},
    acrilico: {type:Number},
    tapizado: {type:Number},
    barro: {type:Number},
    lustre: {type:Number},
    show:{type:Number, default:1}

})

module.exports = model('Auto', AutoSchema);