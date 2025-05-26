import axios from "axios"
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";


//here we are receive the loggedin user id 
const useGetMytweets = async (id: any) => {
    const dispatch = useDispatch();
    const { refresh,isActive } = useSelector((state: any) => state.tweet);

    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}getalltweets/${id}`, {
                withCredentials: true
            });
            
            dispatch(getAllTweets(res.data.tweets));
        }
        catch (error) {
            console.log(error);
        }
    }
    const followingTweetHandler = async () => {
       
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}getfollowtweets/${id}`, { withCredentials: true });
            dispatch(getAllTweets(res.data.tweets));
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        if(isActive){
        fetchMyTweets();
         }
        else{
        followingTweetHandler();
        }
    }, [isActive,refresh])

}
export default useGetMytweets;