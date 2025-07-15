import 'dotenv/config';
import connectDB from '../db/db.js';
import { app } from './app.js';

const port=process.env.port || 3000;

connectDB();

app.listen(port,()=>{
    console.log(port);
})