const {Schema, model} =require('mongoose');

const MesSchema= new Schema({
    fecha:{type:String},
    total: {type:Number}

},
    {timestamps:true}
)


module.exports = model('Mes', MesSchema);