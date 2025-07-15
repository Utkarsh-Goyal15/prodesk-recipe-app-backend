import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Recipe } from '../models/recipe.model.js';
import { Ingredient } from '../models/ingredient.model.js';
import { Instruction } from '../models/instruction.model.js';
import { Collection } from '../models/collection.model.js';
import mongoose from 'mongoose';

export const register=asyncHandler(
    async (req,res)=>{
        let { name,email,password}=req.body;

        if(name.trim()==='' && email.trim()==='' && password.trim()===''){
            throw new ApiError(401,"All fields are required");
        }
        const user =await User.findOne({email});
        if(user){
            throw new ApiError(401,'user already exist');
        }
        const hashPassword=await bcrypt.hash(password,10);
        const newUser=await User.create(
            {
                name,
                email,
                password:hashPassword
            }
        )
        if(!newUser){
            throw new ApiError(500,'user not created');
        }
        res.status(200).json(
            {
                message:"user is created"
            }
        )
    }
)

export const login = asyncHandler(
    async (req,res)=>{
        let {email,password}=req.body;
        if(email.trim===''&&password.trim()===''){
            throw new ApiError(401,"All fields are required");
        }
        const user=User.findOne({email});
        if(!user){
            throw new ApiError(404,'user not registered');
        }
        if(!user.isPasswordCorrect(password)){
            throw new ApiError(401,"Wrong credentials");
        }
        res.status(200).json(
            {
                message:"user logged in Successfully",
                user:user
            }
        )
    }
)

export const addRecipe=asyncHandler(
    async (req,res)=>{
        let { title,description,category,ingredients,quantity,steps,instructions,user_id}=req.body;
        const imagePath=req.file?.path;
    
        if(title.trim()===''&&description.trim()===''&&category.trim()===''&&ingredients.length===0&&quantity.length===0&&steps===''&&instructions.length===0){
            throw new ApiError(401,"all fields are required");
        }
        if(!imagePath){
            throw new ApiError(401,"image is required")
        }
        const uploadedImage= await uploadOnCloudinary(imagePath);
        if(!uploadedImage){
            throw new ApiError(500,"image not uploaded");
        }
        const recipe=await Recipe.create(
            { 
                title,
                description,
                category,
                image:uploadedImage,
                created_by:user_id
            }
        )
        if(!recipe){
            throw new ApiError(500,"recipe not added");
        }
        if(ingredients.length!==quantity.length){
            await Recipe.deleteOne({_id:recipe._id});
            throw new ApiError(401,"Quantity of all Ingredients are necessary");   
        }
        const ingredient=await Ingredient.create(
                {
                    recipe_id:recipe._id,
                    name:ingredients,
                    quantity:quantity
                }
            )
        if(!ingredient){
            await Recipe.deleteOne({_id:recipe._id});
            throw new ApiError(500,'ingredients not added');
        }
        if(instructions.length!=steps){
            await Recipe.deleteOne({_id:recipe._id});
            await Ingredient.deleteOne({_id:ingredient._id});
            throw new ApiError(401,"steps are same as instruction");   
        }
        const instruction=await Instruction.create(
                {
                    recipe_id:recipe._id,
                    steps,
                    instructions
                }
            )
        if(!instruction){
            await Recipe.deleteOne({_id:recipe._id});
            await Ingredient.deleteOne({_id:ingredient._id});
            throw new ApiError(500,"instructions not added");
        }
        res.status(200).json({
            message:"recipe added successfully"
        })
    }
)

export const viewRecipe=asyncHandler(
    async (req,res)=>{
        const {recipe_id}=req.body;
        const recipe=await Recipe.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(recipe_id)
                }
            },
            {
                $lookup:{
                    from:"ingredients",
                    localField:'_id',
                    foreignField:"recipe_id",
                    as:'ingredients'
                }
            },
            {
                $lookup:{
                    from:"instructions",
                    localField:'_id',
                    foreignField:'recipe_id',
                    as:'instructions'
                }
            }
        ])
        if(!recipe){
            throw new ApiError(500,'Server Error');
        }
        res.status(200).json(
            {
                recipe
            }
        )
    }
)

export const addCollection=asyncHandler(
    async (req,res)=>{
        const {user_id,recipe_id}=req.body;
        if(user_id.trim()==='' && recipe_id.trim()===''){
            throw new ApiError(401,"all fields are required");
        }
        const collection=await Collection.create(
            {
                user_id,
                recipe_id
            }
        )
        if(!collection){
            throw new ApiError(500,"recipe not addec to collections");
        }
        res.status(200).json(
            {
                message:"recipe added to collections"
            }
        )
    }
)