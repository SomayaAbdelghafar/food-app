import React from 'react'
import logo from "../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RequestResetPass (props) {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const formSubmit = (dataObject) => {
        axios
          .post("http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request", dataObject)
       

          .then((response) => {
            console.log(response);
            navigate("/resetPass");
           toast("Your request is being processed, please check your email");
          })
    
          .catch((error) => {
            console.log(error);
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
            <form className="w-75 m-auto my-5 " onSubmit={handleSubmit(formSubmit)}>
              <h2>Request Reset Password</h2>
              <p>please enter your email and check your inbox</p>
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

              <button className=" btn btn-success w-100 py-1 my-4">
               send
              </button>
            </form>
            
          </div>
        </div>
      </div>
        </>
    )
}
