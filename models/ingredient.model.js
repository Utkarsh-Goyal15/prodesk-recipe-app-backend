import mongoose from "mongoose";

export const Ingredient=mongoose.model(
    'Ingredient',
    mongoose.Schema(
        {
            recipe_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Recipe",
                required:true
            },
            name:[{
                type:String,
                required:true
            }],
            quantity:[{
                type:String,
                required:true
            }]
        },
        {
            timestamps:true
        }
    )
)