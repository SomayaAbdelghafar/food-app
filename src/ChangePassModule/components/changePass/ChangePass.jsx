import React from "react";
import logo from "../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePass({handleClose}) {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const formSubmit = (dataObject) => {
        axios
          .put("http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword", dataObject,
          {headers:{
            Authorization:`Bearer ${localStorage.getItem('adminToken')}`
          }})
          .then((response) => {
            console.log(response);
           toast("password changed successfully");
           handleClose()
           

          })
    
          .catch((error) => {
            toast(error.response.data.message);
          });
      };
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className=" ">
          <div>
            <div className="logoContainer text-center">
              <img src={logo} alt="" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(formSubmit)}>
              <h2>Change Your Password</h2>
              <p>Enter your details below</p>
              <div className="inputContainer py-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-100 form-control"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <span className="text-danger">oldPassword is required</span>
                  )}
              </div>

              <div className="inputContainer py-2 ">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-100 form-control"
                  {...register("newPassword", { required: true })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <span className="text-danger">newPassword is required</span>
                  )}
              </div>
              <div className="inputContainer py-2 ">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-100 form-control"
                  {...register("confirmNewPassword", { required: true })}
                />
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger">confirmNewPassword is required</span>
                  )}
                {/* {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "required" && (
                    <span className="text-danger">confirmNewPassword is required</span>
                  )} */}
              </div>
            
              <button className=" btn btn-success w-100 py-1 my-4">
              Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
