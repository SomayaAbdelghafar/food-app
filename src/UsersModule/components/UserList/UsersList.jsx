import Header from "../../../sharedModule/components/Header/Header";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import noData from "../../../assets/imgs/noData.svg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UsersList(props) {
    const [usersList, setUsersList] = useState([]);
    const [modalState, setModalState] = useState("close");
    const [userId, setUserId] = useState(0);
    const handleClose = () => setModalState("close");

    useEffect(() => {
        getUsersList();
      }, []);

    const getUsersList =()=>{
        axios
        .get(
          `https://upskilling-egypt.com:443/api/v1/Users/`,
  
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        )
        .then((res) => {
            setUsersList(res?.data?.data);
            console.log(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const showDeleteModal = (id) => {
        setModalState("modal-delete");
        setUserId(id);
      };
    const deleteUser=(userId)=>{
    console.log(userId)
    axios
    .delete(`https://upskilling-egypt.com:443/api/v1/Users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((res) => {
        console.log(res);
      toast("User deleted successfully");
      handleClose();
      getUsersList();
    })
    .catch((err) => {
        console.log(err);
      toast(err?.response?.data?.message);
    });
    }


  return (
    <>
     <Modal show={modalState === "modal-delete"} onHide={handleClose}>
        <Modal.Body>
            delete
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 text-center">
              <img src={noData} alt="no data" className="m-2" />
              <h4>Delete this User?</h4>
              <p className="text-muted py-2">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
              <div className="text-end">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    deleteUser(userId);
                  }}
                >
                  Delete this item
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Header
        header={"Users list"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div>
        <h3>Users table datails</h3>
        <p className="py-2"> you can check all details</p>
      </div>
      <table className="table mt-3 table-striped">
        <thead>
          <tr className="">
            <th>#</th>
            <th>user name</th>
            <th>E-mail</th>
            <th>image</th>
            <th>Phone </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {usersList.map((user)=>(
                 <tr>
                 <td>{user.id}</td>
                 <td>{user.userName}</td>
                 <td>{user.email}</td>
                 <td><div className="recipeImgContainer">
                 <img className="w-100" src={`https://upskilling-egypt.com:443/`+ user.imagePath} alt="user" /></div></td>
                 <td>{user.phoneNumber}</td>
                 <td>
                 <i className="fa-solid fa-trash-can text-danger fa-lg  mx-"
                  onClick={() => {
                    showDeleteModal(user.id);
                  }}></i>
                 </td>
                 </tr>

            ))}
       

        </tbody>
       
      </table>
    </>
  );
}
