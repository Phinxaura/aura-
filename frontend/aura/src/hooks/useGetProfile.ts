import axios from "axios"
import { USER_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";


//here we are receive the loggedin user id 
const useGetProfile = async (id:any) => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchMyProfile = async () => {
            try{
                const res = await axios.get(`${USER_ENDPOINT}profile/${id}`,{
                    withCredentials : true
                });
                dispatch(getMyProfile(res.data.user ));
            }
            catch(error){
                console.log(error);
            }
        }
        fetchMyProfile();
    },[id])
   
} 
export default useGetProfile;