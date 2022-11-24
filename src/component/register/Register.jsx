import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CarContext } from './../contextApi/ContextApi';
const Register = () => {
    // context use 
    const {createUserEmailPassword} = useContext(CarContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const userData=(user)=>{
        const {email,fullName,password} = user;
        createUserEmailPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            toast.success('Registered successfully');
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            // ..
          });
    }
    return (
        <div>
            <div className="hero min-h-screen">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Register</h1>
    </div>
    <div className="card flex-shrink-0 w-[450px] max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
      <form onSubmit={handleSubmit(userData)}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Full-Name</span>
          </label>
          <input type="text" {...register("fullName")} placeholder="full-name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" />
        <div className='flex justify-between'>
        <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot-Password</a>
          </label>
          <label className="label">
            <Link to="/login" className="label-text-alt link link-hover text-red-800 font-bold">Login</Link>
          </label>
        </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit'>Register</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;