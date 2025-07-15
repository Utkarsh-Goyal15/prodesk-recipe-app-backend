import mongoose from 'mongoose';
import { DB_NAME, DB_URL } from '../src/constant.js';

const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(`${DB_URL}/${DB_NAME}`);
        console.log(`DB_HOST: ${connect.connection.host}`)
    } catch (error) {
        console.error('Error',error)
        process.exit(1)
    }
}

export default connectDB