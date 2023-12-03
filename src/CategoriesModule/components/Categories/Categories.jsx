import React, { useEffect, useState } from "react";
import Header from "../../../sharedModule/components/Header/Header";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import noData from "../../../assets/imgs/noData.svg";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories(props) {
  const [categoriesList, setCategoriesList] = useState([]);
  const[modalState,setModalState]=useState ("close")
  const[categoryId,setCategoryId]=useState (0)
  const showAddModal =()=>{
    setValue("name",null)
    setModalState("modal-add")
  }
  const showDeleteModal =(id)=>{
    setModalState("modal-delete")
    setCategoryId(id)
  } 
  const showUpdateModal =(category)=>{
    setModalState("modal-update")
    setCategoryId(category.id)
    setValue("name",category.name)

  }

  const handleClose = () => setModalState("close");


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const addCategory = (data) => {
    axios
      .post(`https://upskilling-egypt.com:443/api/v1/Category/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        toast("category added successfully");
        handleClose();
        getCategories();
      })
      .catch((err) => {
        toast("error in adding new category");
      });
  };
  const daleteCategory = (categoryId)=>{
    axios
    .delete(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((res) => {
      toast("category deleted successfully"); 
      handleClose();
      getCategories();
    })
    .catch((err) => {
      toast("error while deleting item");

    });
  }
 
  const getCategories = () => {
    axios
      .get(
        `https://upskilling-egypt.com:443/api/v1/Category/?&pageSize=30&pageNumber=1`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((res) => {
        setCategoriesList(res.data.data);
        
      })
      
  };

  const updateCategory =(data)=>{
    axios
    .put(`https://upskilling-egypt.com:443/api/v1/Category/${categoryId}`,data,
     {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((res) => {
      toast("category updated successfully"); 
      handleClose();
      getCategories();
    })
    .catch((err) => {
      console.log(err);
      toast("error while updating item");

    });

  }

  useEffect(() => {
    getCategories();
  }, []);
  return(
    <>
      <Modal show={modalState==="modal-add"} onHide={handleClose}>
        <Modal.Body>
          <div>
            <form
              className="w-75 m-auto py-5 "
              onSubmit={handleSubmit(addCategory)}
            >
              <h3>Add New Categories</h3>
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="category name"
                  className="w-100 form-control my-5"
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">Categort name is required</span>
                )}
              </div>
              <div className="btn-container text-end">
                <button className=" btn btn-success py-1 px-5">save</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={modalState==="modal-delete"} onHide={handleClose}>
        <Modal.Body>
          
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 text-center">
              <img src={noData} alt="no data" className="m-2" />
              <h4>Delete this category?</h4>
              <p className="text-muted py-2">
              are you sure you want to delete this item ? if you are sure just click on delete it
              </p>
              <div className="text-end">
              <button className="btn btn-outline-danger" onClick={()=>{daleteCategory(categoryId)}}>
                Delete this item
              </button>

              </div>
             
            </div>
          </div>
           
          
        </Modal.Body>
      </Modal>

      <Modal show={modalState==="modal-update"} onHide={handleClose}>
        <Modal.Body>
          <div>
          <form
              className="w-75 m-auto py-5 "
              onSubmit={handleSubmit(updateCategory)}
            >
              <h3>Update Category</h3>
              <div className="inputContainer">
                <input
                  type="text"
                  placeholder="category name"
                  className="w-100 form-control my-5"
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">Categort name is required</span>
                )}
              </div>
              <div className="btn-container text-end">
                <button className=" btn btn-success py-1 px-5">update</button>
              </div>
            </form>
            
          </div>
        </Modal.Body>
      </Modal>
      <Header
        header={"Categories Items"}
        paragraph={
          "You can now add your items that any user can order it from the Application and you can edit "
        }
      />
      <div className="row bg-light p-4 justify-content-between">
        <div className="col-md-6">
          <h3>Categories Table Details </h3>
          <p className="py-2"> you can check all details</p>
        </div>
        <div className="col-md-3 text-white">
          <button className="btn btn-success" onClick={showAddModal}>
            Add New Category
          </button>
        </div>
      </div>
      {categoriesList.length > 0 ? (
        <table className="table mt-5 bg-light">
          <thead>
            <tr className="bg-light">
              <th>id</th>
              <th>category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((category, id) => (
              <>
                <tr key={id}>
                  <th>{category.id}</th>
                  <td>{category.name}</td>
                  <td>
                    <i className="fa-solid fa-trash-can text-danger fa-xl mx-2" onClick={()=>{
                        showDeleteModal(category.id)
                        }} ></i>
                    <i className="fa-solid fa-pencil text-success fa-xl  mx-2" onClick={()=>{
                      showUpdateModal(category)
                      }}></i>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <img src={noData} alt="no data" />
              <h3>No Data</h3>
              <p>
              there is no data here !!  
               you can add using adding button
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

