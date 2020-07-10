const {Schema, model} =require('mongoose');

const RUcajaSchema= new Schema({
    user: {type:String, required:true},
    box:{type:Number, required:true},
    action: {type:String, required:true},
    type:{type:String, required:true},

})


module.exports = model('RUcaja', RUcajaSchema);