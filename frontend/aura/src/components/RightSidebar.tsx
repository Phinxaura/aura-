import { CiSearch } from "react-icons/ci";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const RightSidebar = ({otherUsers} : any) => {
    return (
        <div className="w-[20%] ">
            <div className="p-2 bg-gray-100 rounded-full outline-none flex items-center mt-3" >
                <CiSearch />
                <input type="text" placeholder="Search" className="bg-transparent outline-none px-2" />
            </div>
            <div className="p-4 my-4 bg-gray-100 rounded-2xl">
                <h1 className="font-bold text-lg my-3">Who to follow</h1>
                {


                    otherUsers?.map((user: any) => {
                        return (
                            <div key = {user?._id}className="flex items-center justify-between">
                                <div className="flex">
                                    <div>
                                        <Avatar
                                            alt="John Bolt"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY_5Zr-Kdgev2PgR_c9WD5cQkLWx6b7I5Ew&s" />
                                    </div>
                                    <div className="ml-2">
                                        <h1 className="font-bold">{user?.name}</h1>
                                        <p className="text-sm">@{user?.username}</p>
                                    </div>
                                </div>
                                <div>  
                                    <Link to={`/profile/${user?._id}`}>
                                    <button className="px-4 py-1 bg-black text-white rounded-full cursor-pointer">Profile</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }


            </div>



        </div>
    )
}

export default RightSidebar
