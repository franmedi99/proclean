const {Schema, model} =require('mongoose');

const BoxSchema= new Schema({
    box: {type:Number, required:true},

}
)


module.exports = model('Box', BoxSchema);