import React from 'react'
import userIcon from "../../../assets/imgs/userIcon.png"
export default function Navbar({adminData}) {
  

    return (
        <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-5">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    
    {/* <a className="navbar-brand ms-auto pe-2" href="#">{adminData.userName}</a> */}
    <img src={userIcon} alt="user image" />
  </div>
           </nav>  
           
           
        </>
    )
}
