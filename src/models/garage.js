const {Schema, model} =require('mongoose');

const GarageSchema= new Schema({
    patente: {type:String},
    marca: {type:String},
    modelo: {type:String},
    fecha: {type:String},
    hora: {type:String},
    tipo: {type:String}
},
    {timestamps:true}
)


module.exports = model('Garage', GarageSchema);