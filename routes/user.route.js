import { Router } from "express";
import { addCollection, addRecipe, login, register, viewRecipe } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/addRecipe').post(upload.single('image'),addRecipe);
router.route('/viewRecipe').post(viewRecipe);
router.route('/addCollection').post(addCollection);

export default router;