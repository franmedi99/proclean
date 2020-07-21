const {Schema, model} =require('mongoose');

const ClientSchema= new Schema({
    patente: {type:String, required: true},
    marca: {type:String,default: ' '},
    modelo: {type:String,default: ' '},
    phone: {type:String,default: ' '},
    cuenta: {type:String,default: ' ' },
    tipo: {type:String, required:true}
},
    {timestamps:true}
)


module.exports = model('Client', ClientSchema);