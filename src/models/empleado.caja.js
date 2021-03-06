const {Schema, model} =require('mongoose');

const RUcajaSchema= new Schema({
    user: {type:String, required:true},
    box:{type:Number, required:true},
    action: {type:String, required:true},
    type:{type:String, required:true},
    fecha:{type:String,required:true},
    hora:{type:String,required:true},
    show:{type:Number, default: 1}
},
{timestamps:true}
)


module.exports = model('RUcaja', RUcajaSchema);