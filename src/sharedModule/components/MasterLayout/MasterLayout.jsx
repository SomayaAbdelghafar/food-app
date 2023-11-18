import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({adminData}) {
    

    return (
        <>
        <div className='container-fluid '>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                   <div><Navbar adminData={adminData} /></div>  
                   <div> <Header /></div>                  

                    <Outlet />
                </div>
            </div>


        </div>
            
        </>
    )
}
