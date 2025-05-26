import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})


const MONGO_URI : any = process.env.MONGO_URI;


const databaseConnect = () =>{
   mongoose.connect(MONGO_URI).then(()=>{
    console.log('connected to mongodb')
   }).catch((error)=>{
    console.log(error);
   })
}
export default databaseConnect;