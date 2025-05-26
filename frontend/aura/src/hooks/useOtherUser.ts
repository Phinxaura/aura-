import axios from "axios"
import { USER_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";


//here we are receive the loggedin user id 
const useOtherUser = async (id:any) => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchOtherUsers = async () => {
            try{

                //here we are giving id of login user bascially take out all user other than login here is the point 
                const res = await axios.get(`${USER_ENDPOINT}otheruser/${id}`,{
                    withCredentials : true
                });
                dispatch(getOtherUsers(res.data.otherUsers));
            }
            catch(error){
                console.log(error);
            }
        }
        fetchOtherUsers();
    },[])
   
} 
export default useOtherUser;