import mongoose from "mongoose";

export const Recipe=mongoose.model(
    'Recipe',
    mongoose.Schema(
        {
            title:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            },
            category:{
                type:String,
                required:true
            },
            image:{
                type:String
            },
            created_by:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        },
        {
            timestamps:true
        }
    )
)