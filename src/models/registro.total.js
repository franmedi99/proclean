const {Schema, model} =require('mongoose');

const TotalSchema= new Schema({
    fecha:{type:String},
    total: {type:Number},
    lavados:{type:Number},
    cocheras:{type:Number}
},
    {timestamps:true}
)


module.exports = model('Total', TotalSchema);