import React, { useContext } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { CarContext } from './../contextApi/ContextApi';
import { toast } from 'react-toastify';

const Login = () => {
    const {loginUserEmailPassword, userData}=useContext(CarContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate= useNavigate();
    if(userData && userData?.email){
        return navigate('/');
    }
    const loginData=(data)=>{
        const {email, password}=data;
        loginUserEmailPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigate('/');
            toast.success('login successfully');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
        
    }
    return (
        <div>
            <div className="hero min-h-screen">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Login now</h1>
    </div>
    <div className="card flex-shrink-0 w-[450px] max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={handleSubmit(loginData)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" {...register("email")} placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" />
         <div className='flex justify-between'>
         <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          <label className="label">
            <Link to="/register" className="label-text-alt link link-hover text-red-800 font-bold">Register</Link>
          </label>
         </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;