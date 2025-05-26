import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})

const isAuthenticated = async (req : any ,res : any ,next : any) => {
    try {
        const token = req.cookies.token; 
        if(!token){
            return res.status(401).json({
                message:"User not authenticated.",
                success:false
            })
        }
        const token_secret : any = process.env.TOKEN_SECRET ;
        const decode : any = await jwt.verify(token, token_secret );
        req.user = decode.userId ; 
        // console.log(req);
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;