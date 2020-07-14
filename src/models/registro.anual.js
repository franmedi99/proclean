const {Schema, model} =require('mongoose');

const anualSchema= new Schema({
    fecha:{type:String},
    total: {type:Number},
    show: {type:Number, default:1}
},
    {timestamps:true}
)


module.exports = model('Anual', anualSchema);