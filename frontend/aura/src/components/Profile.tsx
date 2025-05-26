import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_ENDPOINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";




const Profile = () => {

    const { id }: any = useParams();
    const dispatch = useDispatch();
    const { user, profile } = useSelector((state: any) => state.user);
    useGetProfile(id);
    const followandunffollowhandler = async () => {

        if (user.following.includes(id)) {
            //unfollow
            try {
                //id of user to which we want to follow
                const res = await axios.post(`${USER_ENDPOINT}unfollow/${id}`, { id: user?._id }, {
                    withCredentials: true
                })
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res?.data?.message);
            } catch (error: any) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        } else {
            //follow
            try {
                //id of user to which we want to follow
                const res = await axios.post(`${USER_ENDPOINT}follow/${id}`, { id: user?._id }, {
                    withCredentials: true
                })
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res?.data?.message);
            } catch (error: any) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }
    return (
        <div className="w-[50%]">
            <div className="flex items-center py-2">
                <Link to="/" className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                    <IoArrowBackOutline size="20px" />
                </Link>
                <div className="ml-2">
                    <h1 className="font-bold text-lg">
                        {/* Shrek instead of this now use */}
                        {profile?.name}
                    </h1>
                    <p className="text-sm text-gray-500">10 Posts</p>
                </div>
            </div>

            <img className=""
                src="https://t4.ftcdn.net/jpg/04/55/65/69/360_F_455656949_lOgZhle5nMrzDJdoUMpZU0CH3CHWGprt.jpg" alt="banner" />
            <div className="absolute top-83  ml-2 border-4 border-white rounded-full">
                <Avatar
                    alt="John Bolt"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY_5Zr-Kdgev2PgR_c9WD5cQkLWx6b7I5Ew&s" sx={{ width: 150, height: 150 }} />
            </div>
            <div className="text-right  m-4 ">
                {
                    profile?._id === user?._id ? <button className="px-4 py-1 hover:bg-gray-200 rounded-full  border border-gray-400 cursor-pointer">Edit Profile</button>
                        :
                        <button onClick={followandunffollowhandler} className="px-4 py-1 bg-black text-white rounded-full cursor-pointer">{user?.following?.includes(id) ? "Following" : "Follow"}</button>
                }

            </div>
            <div className="m-4">
                <h1 className="font-bold text-2xl">


                    {/* Patel */}
                    {profile?.name}

                </h1>
                <p>
                    {/* @patelmernstack */}

                    @{profile?.username}
                </p>
            </div>
            <div className="m-4">
                <p>Exploring the web's endless possibilities with mern stack problem solver by day coder by night ! yeah that's true about me </p>
            </div>
        </div>
    )
}

export default Profile;
