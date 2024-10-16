import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { LogIn } from "./pages/login";
import { NetWorks } from "./pages/networks";
import { Private } from "./routes/private";
import { NotFound } from "./pages/notfound";



const router = createBrowserRouter([

    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/admin',
      element: <Private><Admin/></Private>
    },

    {
      path: '/login',
      element: <LogIn/>
    },

    {
      path:'/admin/network',
      element: 
      <Private><NetWorks/></Private>
    },{
      path: '*',
      element: <NotFound/>
    }

])


export {router}