import React from 'react'
import {  useNavigate } from 'react-router-dom'
export default function Sidebar(props) {
   const navigate= useNavigate()
    function logout (){
        localStorage.removeItem('adminToken')
        navigate('/login')

    }

    return (
        <>
            <p>side bar</p>
            <button className='btn btn-danger' onClick={logout}>
               logout 
            </button>
        </>
    )
}
