import React from "react";
import logo from "../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login({saveAdmindata }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (dataObject) => {
    axios
      .post("http://upskilling-egypt.com:3002/api/v1/Users/Login", dataObject)
      .then((response) => {
        toast("you are logged in successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
        localStorage.setItem("adminToken",response.data.token);
       saveAdmindata();
      })

      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  return (
    <>
      <div className="authContainer container-fluid">
        <ToastContainer />
        <div className="overLay row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white">
            <div className="logoContainer text-center">
              <img src={logo} alt="" />
            </div>
            <form className="w-75 m-auto" onSubmit={handleSubmit(formSubmit)}>
              <h2>Log In</h2>
              <p>Welcome Back! Please enter your details</p>
              <div className="inputContainer py-2">
                <input
                  type="text"
                  placeholder="Enter your E-mail"
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
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">password is required</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span className="text-danger">password is invalid</span>
                )}
              </div>
              <div className="d-flex justify-content-between py-2 ">
                <p>Register Now?</p>
                <p className="text-success">Forgot Password?</p>
              </div>
              <button className=" btn btn-success w-100 py-1 my-4">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
