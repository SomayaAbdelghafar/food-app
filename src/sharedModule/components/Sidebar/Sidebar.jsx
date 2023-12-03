import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Modal from 'react-bootstrap/Modal';
import ChangePass from "../../../ChangePassModule/components/changePass/ChangePass";
import sideIcon from "../../../assets/imgs/sidebarIcon.png"
export default function SideBar(props) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/login");
  }
  const[isCollapsed,setIsCollapsed]=useState()

  const handleToggle=()=>{
  setIsCollapsed(!isCollapsed)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
        <ChangePass handleClose={handleClose} />
        </Modal.Body>
        
      </Modal>
      <div className="sidebar-container text-white">
      <Sidebar className="vh-100" collapsed={isCollapsed}>
        <Menu>
        <MenuItem icon={<i className="fa-solid fa-bars "></i>} onClick={handleToggle} >
            <img src={sideIcon} alt="" />
             </MenuItem>
         
          <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem  icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/userlist" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>} onClick={handleShow} > Change password</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-share-from-square"></i>} onClick={logout}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      </div>
      
     
    </>
  );
}
