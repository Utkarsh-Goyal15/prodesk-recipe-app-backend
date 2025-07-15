import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

userSchema.methods.isPasswordCorrect= async (password)=>{
    return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model(
    'User',
    userSchema
)