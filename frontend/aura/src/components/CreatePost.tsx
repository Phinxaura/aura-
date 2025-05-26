import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_ENDPOINT } from '../utils/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {  getIsActive, getRefresh } from '../redux/tweetSlice';


const CreatePost = () => {
  const   [description,Setdescription] = useState("");
  const {user} = useSelector((state:any)=>state.user);
  const {isActive} = useSelector((state:any)=>state.tweet);
  const dispatch = useDispatch();
  const submitHandler = async () =>{ 
    try{
      const res = await axios.post(`${TWEET_API_ENDPOINT}create`,{description,id:user?._id},{
        withCredentials : true,
      });
    dispatch(getRefresh());
    if(res.data.success){
      toast.success(res.data.message);
    }

    }catch(error: any){
        toast.error(error.response.data.message);
        console.log(error);
    }
Setdescription("");
  }
const forYouHandler = () =>{
dispatch(getIsActive(true));
}
const followingHandler = () =>{
  dispatch(getIsActive(false));
}
 
  

  return (
    <div className="w-[100%]">
      <div>
        {/* div1 for for-you and following */}
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg">For You</h1>
          </div>
            <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg cursor">Following</h1>
          </div>
        </div>

        {/* div 2 for avatar and some options  */}
        <div >
          <div className='flex  p-4'>
            <div className=''>
            <Avatar
              alt="John Bolt"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY_5Zr-Kdgev2PgR_c9WD5cQkLWx6b7I5Ew&s"  />
            </div>
            <input className='w-full outline-none  ml-2 text-xl' type='text' value={description} onChange = {(e)=>Setdescription(e.target.value)}placeholder='What is happening ?!'/>
          </div>
          <div className='flex items-center justify-between p-4 border-b border-gray-300'>
            <div>
            <CiImageOn size="24px"/>
            </div>
            <button className='bg-[#1D9BF0] text-lg text-white font-semibold px-3 py-2 border-none rounded-full cursor-pointer' onClick={submitHandler}>Post</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePost
