import mongoose from "mongoose";

export const Instruction = mongoose.model(
    'Instruction',
    mongoose.Schema(
        {
            recipe_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Recipe",
                required:true
            },
            steps:{
                type:Number,
                required:true
            },
            instructions:[{
                type:String,
                required:true
            }]
        },
        {
            timestamps:true
        }
    )
)