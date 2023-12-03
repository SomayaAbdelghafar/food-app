import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({adminData}) {
    

    return (
        <>
        <div className='container-fluid m-0 p-0'>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 " style={{paddingRight:50,paddingLeft:70,paddingTop:30}}>
                   <div><Navbar adminData={adminData} /></div>  
                    <Outlet />
                </div>
            </div>


        </div>
            
        </>
    )
}
