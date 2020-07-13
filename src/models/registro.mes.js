const {Schema, model} =require('mongoose');

const MesSchema= new Schema({
    fecha:{type:String},
    total: {type:String}

},
    {timestamps:true}
)


module.exports = model('Mes', MesSchema);