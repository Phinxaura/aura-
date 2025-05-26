import { useSelector } from "react-redux"
import useOtherUser from "../hooks/useOtherUser"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import { Outlet, useNavigate } from "react-router-dom"
import useGetMytweets from "../hooks/useGetMytweets"
import { useEffect } from "react"

const Home = () => {
    const navigate = useNavigate();
  //custom hooks
  const {user,otherUsers} = useSelector((state:any)=>state.user);
  useOtherUser(user?._id);
  useGetMytweets(user?._id);
  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  })
  

  return (
    <div className="flex justify-between w-[80%] mx-auto ">
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers = {otherUsers}/>
    </div>
  )
}

export default Home
