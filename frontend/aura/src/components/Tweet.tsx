import { Avatar } from "@mui/material";
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast  from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constant";
const Tweet = ({tweet} : any) => {

//send which tweet is liked and which user is liked 
//logged in userid send in the body
  const {user } = useSelector((state : any)=>state.user);
 const dispatch = useDispatch();
  const likeordislikeHandler = async (id : any)=>{
    try{
      const res =   await axios.put(`${TWEET_API_ENDPOINT}like/${id}`,{id : user?._id},{
        withCredentials : true
      })
      dispatch(getRefresh());
      toast.success(res.data.message);
    }catch(error : any){
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const deleteTweetHandler = async(id : any) =>{

      try{
          const res = await axios.delete(`${TWEET_API_ENDPOINT}delete/${id}`,{
            withCredentials : true,
          })
          dispatch(getRefresh());
          toast.success(res.data.message);
      }catch(error : any){
           toast.error(error.response.data.message);
        console.log(error);
      }

      
      
  }
  console.log(tweet?.createdAt)
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex  p-4">
          <Avatar
            alt="John Bolt"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY_5Zr-Kdgev2PgR_c9WD5cQkLWx6b7I5Ew&s" />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">
{/*                 
                Patel */}
            {tweet?.userDetails[0]?.name}
              </h1>
              <p className="text-gray-500 text-sm ml-1">
                
                {/* @patelmernstack . 1m */}
                {`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`}
                </p>
            </div>
            <div>
              <p>
                {/* Hello developers let's connect and grow together .  */}
                {tweet?.description}
                </p>
            </div>
            <div className="flex items-center justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                <FaRegComment size="24px" />
                </div>
               
                <p className=" ">0</p>
              </div>
              <div className="flex items-center ">
                <div onClick={()=>likeordislikeHandler(tweet?._id)} className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                <GrLike size="20px"/>
                </div>
                
                <p className=" ">
                  {/* 0 */}
                  {tweet?.like?.length}
                  </p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                <CiBookmark size="24px"/>
                </div>
                <p className="">0</p>
              </div>
             {
              user?._id === tweet?.userId && ( <div className="flex items-center">
                <div onClick={()=>deleteTweetHandler(tweet?._id)} className="p-2 hover:bg-red-600 rounded-full cursor-pointer">
                <MdDeleteOutline size="24px"/>
                </div>
              </div>)
             }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
