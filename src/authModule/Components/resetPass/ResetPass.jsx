import React from 'react'
import logo from "../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

      
  
     
export default function ResetPass(props) {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const formSubmit = (dataObject) => {
      axios
        .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset", dataObject)
     

        .then((response) => {
          console.log(response);
         toast("Your request is being processed, please check your email");
         navigate("/login");

        })
  
        .catch((error) => {
          console.log(error.response);
          toast("error in your request");
        });
    };
    return (
        <>
            <div className="authContainer container-fluid">
        
        <div className="overLay row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white">
            <div className="logoContainer text-center">
              <img src={logo} alt="" className='w-50 m-auto' />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(formSubmit)}>
              <h2>Reset Password</h2>
              <p>Please enter your opt ot check your inbox</p>
              <div className="inputContainer py-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-100 form-control"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@]+@[^@]+\.[^@]+$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="text-danger">email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger">email is invalid</span>
                )}
              </div>

              <div className="inputContainer py-2 ">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-100 form-control"
                  {...register("password", { required: true ,
                  pattern:/^[a-zA-Z]{2}@(\d+)$/})}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">password is required</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span className="text-danger">password is invalid</span>
                )}
              </div>
              <div className="inputContainer py-2 ">
                <input
                  type="Password"
                  placeholder="confirmPassword"
                  className="w-100 form-control"
                  {...register("confirmPassword", { required: true})}
                  
                />
                {/* {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                  <span className="text-danger">confirmPassword is required</span>
                )}
                {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                  <span className="text-danger">Passwords must match</span>
                )} */}
              </div>
              <div className="inputContainer py-2 ">
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-100 form-control"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.seed && errors.seed.type === "required" && (
                  <span className="text-danger">OTP is required</span>
                )}
                
              </div>
             
              <button className=" btn btn-success w-100 py-1 my-4">
                Reset Password
              </button>
            </form>
           
          </div>
        </div>
      </div> 
        </>
    )
}
