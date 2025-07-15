import mongoose from 'mongoose';

export const Review=mongoose.model(
    'Review',
    mongoose.Schema(
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            recipe_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Recipe",
                required:true
            },
            rating:{
                type:Number,
                min:0,
                max:5,
                default:0
            },
            comment:{
                type:String
            }
        },
        {
            timestamps:true
        }
    )
)