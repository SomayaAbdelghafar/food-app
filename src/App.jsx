import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './authModule/Components/Login/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './sharedModule/components/AuthLayout/AuthLayout'
import NotFound from './sharedModule/components/NotFound/NotFound'
import Home from "./HomeModule/components/Home/Home"
import Categories from './CategoriesModule/components/Categories/Categories'
import Recipes from './RecipesModule/components/Recipes/Recipes'
import UsersList from './UsersModule/components/UserList/UsersList'
import MasterLayout from './sharedModule/components/MasterLayout/MasterLayout'
import ForgetPass from './authModule/Components/ForgetPass/ForgetPass'
import {jwtDecode} from 'jwt-decode'
import ProtectedRoute from './sharedModule/components/protectedRoute/ProtectedRoute'
import ChangePass from './ChangePassModule/components/changePass/ChangePass'
function App() {
 const [adminData, setAdminData] = useState(null)
 
 const saveAdmindata =()=>{

  const uncodedToken=localStorage.getItem("adminToken")
  const decodedToken = jwtDecode(uncodedToken)
  setAdminData(decodedToken); 
  
  
 }

 useEffect(() => {
  if (localStorage.getItem('adminToken')){
    saveAdmindata()
  }
    

  }, []);
  const routes= createBrowserRouter([
    {path:"/dashboard",element:<ProtectedRoute adminData={adminData}>
      <MasterLayout adminData={adminData} />
    </ProtectedRoute>
      ,errorElement:<NotFound />,children:[
      {index:true,element:<Home />},
      {path:'home',element:<Home />},
      {path:'categories',element:<Categories />},
      {path:'recipes',element:<Recipes />},
      {path:'userlist',element:<UsersList />},
      {path:'changePass',element:<ChangePass />}
    ]},
    {path:"/",element:<AuthLayout />,errorElement:<NotFound />,children:[
      {index:true,element:<Login saveAdmindata={saveAdmindata}/>},
      {path:'login',element:<Login saveAdmindata={saveAdmindata}/>},
      {path:'forgetPass',element:<ForgetPass />},
    ]}
  ])

  return (
    <>
     <RouterProvider router={routes} />
      
    </>
  )
}

export default App
