const mongoose=require("mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`)

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});


module.exports=mongoose.model("user",userSchema)
