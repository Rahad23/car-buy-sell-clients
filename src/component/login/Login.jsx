import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div className="hero min-h-screen">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Login now</h1>
    </div>
    <div className="card flex-shrink-0 w-[450px] max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
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
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;