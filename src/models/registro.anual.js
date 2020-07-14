const {Schema, model} =require('mongoose');

const anualSchema= new Schema({
    fecha:{type:String},
    total: {type:Number}

},
    {timestamps:true}
)


module.exports = model('Anual', anualSchema);