import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userShcema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minmum password length is 6 charecters"],
  },
});


// fire a function before a doce sved to db
userShcema.pre("save", async function (next) {
 const salt = await bcrypt.genSalt()
 // this keyword refers to the instance of the user we are about to create
 this.password = await bcrypt.hash(this.password, salt)
  next();
});

export default mongoose.model("Users", userShcema);
