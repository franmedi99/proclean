const {Schema, model } = require('mongoose');
const bcrypt= require('bcryptjs');

const UserSchema= new Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    rol: {type:String,required: true, default:"Usuario"}
},
{timestamps:true});


UserSchema.methods.encryptPassword=async password =>{
const salt = await bcrypt.genSalt(15);
return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword =async function(password) {
  return await bcrypt.compare(password, this.password)
}



module.exports = model('User',UserSchema);