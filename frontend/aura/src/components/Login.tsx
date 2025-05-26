import { useState } from "react";
import axios from 'axios';
import { USER_ENDPOINT } from "../utils/constant";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSignupHandler = () => {
        //create like toggle
        setIsLogin(!isLogin);
    }

    const submitHandler = async (e: any) => {
        e.preventDefault();
        if (isLogin) {
            //login
            try {
                const res = await axios.post(`${USER_ENDPOINT}login`,
                    {
                        email, password
                    }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
                );
                // console.log(res);
                dispatch(getUser(res?.data?.user));
                if(res.data.success){
                    navigate('/');
                    toast.success(res.data.message);
                }
                
            } catch (error: any) {
                toast.error(error.response.data.message);
                console.log(error);

            }
        } else {
            //sign up
            try {
                const res = await axios.post(`${USER_ENDPOINT}register`,
                    {
                        name, username, email, password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    }
                )
                if(res.data.success){
                    setIsLogin(true);
                    toast.success(res.data.message);
                }
                // console.log(res);
            } catch (error: any) {
                toast.success(error?.response?.data?.message);
                console.log(error);
            }
        }
        // console.log(name,username , email, password);
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex items-center justify-evenly w-[80%]">
                <div>
                    <img className="ml-3" width={"800px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVnQJMGacWqWeihChdtUyoXQAntmGUi5TaA&s" alt="auralogo" />
                </div>
                <div className="">
                    <div className="mx-3 ">
                        <h1 className="font-bold text-6xl">Be The Aura....</h1>
                    </div>
                    <h1 className="my-2 font-bold text-2xl">{isLogin ? "Login" : "Sign Up"}</h1>
                    <form onSubmit={submitHandler} className="flex flex-col w-[70%]">
                        {
                            !isLogin && (
                                <>
                                    <input type="text" value={name} onChange={(e: any) => {
                                        setName(e.target.value)
                                    }} placeholder="Name" className="outline-pink-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                                    <input type="text" value={username}
                                        onChange={(e: any) => {
                                            setUsername(e.target.value)
                                        }} placeholder="Username" className="outline-pink-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                                </>
                            )
                        }
                        <input type="email" placeholder="Email" value={email}
                            onChange={(e: any) => {
                                setEmail(e.target.value)
                            }} className="outline-pink-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                        <input type="password" value={password}
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                            }} placeholder="Password" className="outline-pink-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                        <button className="bg-[#1D9BF0] border-none rounded-full py-2 text-lg text-white my-4 cursor-pointer">{isLogin ? "Login" : "Create Account"} </button>
                        <h1>{isLogin ? "Do not have an account ?" : "Already have an account ?"}<span className="cursor-pointer font-bold text-blue-600" onClick={loginSignupHandler}>{isLogin ? " Register" : " Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
