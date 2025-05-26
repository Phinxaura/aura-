import { IoHome } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_ENDPOINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
    const {user} = useSelector((state : any) => state.user);
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try{
            const res  = await axios.get(`${USER_ENDPOINT}logout`,{
                withCredentials:true,
            });
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            toast.success(res.data.message);
            navigate('/login');
        }catch(error){console.log(error)}
    }
    return (

        <div className="w-[20%]">
            <div>
                <div>
                    <img className="ml-3" width={"80px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVnQJMGacWqWeihChdtUyoXQAntmGUi5TaA&s" alt="auralogo" />
                </div>
                <div>
                    <Link to="/" className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <IoHome size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">Home</h1>
                    </Link>
                    <Link to='/explore' className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <FaHashtag size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">Explore</h1>
                    </Link>
                    <Link to="/notifications" className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <IoIosNotificationsOutline size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">Notifications</h1>
                    </Link>
                    <Link to={`/profile/${user?._id}`} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <FaRegUserCircle size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">profile</h1>
                    </Link>
                    <Link to="/bookmarks" className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <FaRegBookmark size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">Bookmarks</h1>
                    </Link>
                    <div onClick={logoutHandler} className="flex items-center my-2 hover:bg-gray-200 px-4 py-2 hover:cursor-pointer rounded-full">
                        <div>
                            <AiOutlineLogout size="24px" />
                        </div>
                        <h1 className="font-bold text-lg ml-2 mt-0.5">Logout</h1>
                    </div>
                    <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
