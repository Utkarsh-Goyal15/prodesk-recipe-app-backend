import mongoose from "mongoose";

export const Collection=mongoose.model(
    'Collection',
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
            }
        },
        {
            timestamps:true
        }
    )
)