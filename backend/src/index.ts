import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import databaseConnect from './config/db';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute';
import tweetRoute from './routes/tweetRoute';
import cors from 'cors';
// ✅ Load env first
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

// ✅ Then connect to DB
databaseConnect();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript with Express!');
// });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin : "http://localhost:5173",
  credentials : true
}

app.use(cors(corsOptions));
 
//api for user
app.use('/api/v1/user',userRoute);
//http://localhost:8080/ // this thing is constant
//http://localhost:8080/api/v1/user/register 


//api for tweet
app.use('/api/v1/tweet',tweetRoute);

//from frontend if any user req this home then backend respond this on client side 
//home is route if in frontend someone hit that home then it gets this response from back to cleint side 
// app.get('/home',(req,res)=>{
//     res.status(200).json({
//         message : 'coming from backend.....'
//     })
// })
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
