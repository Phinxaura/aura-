import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Feed from "./Feed";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Bookmarks from './Bookmarks';
import Explore from "./Explore";
const Body = () => {
    const approuter = createBrowserRouter([{
        path: '/',
        element: <Home />,
        children: [{
            path: '/',
            element: <Feed />
        },
        {
            path: "/profile/:id",
            element: <Profile />
        },
        {
            path: '/notifications',
            element: <Notifications />
        },
        {
            path: '/bookmarks',
            element: <Bookmarks />
        },{
            path: '/explore',
            element: <Explore/>
        },
         ]
    },
    {
        path: '/login',
        element: <Login/>
    }
    ]);
    return (
        <div>
            <RouterProvider router={approuter} />
        </div>
    )
}

export default Body
