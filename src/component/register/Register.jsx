import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CarContext } from './../contextApi/ContextApi';
import swal from 'sweetalert';
const Register = () => {
  // context use 
  const { createUserEmailPassword, userData, googlePopUp, serverUser } = useContext(CarContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  if (userData && userData?.email) {
    return navigate('/');
  }
  const userDataRegister = (user) => {
    const { email, fullName, password, select } = user;
    createUserEmailPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const emails = {
          email: user.email,
        };
        // jwt
        fetch('https://car-server-eight.vercel.app/jwt', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(emails)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('key', data.token);
            // console.log(data)
          })

        const userData = {
          email,
          fullName,
          select
        }
        console.log(userData);
        fetch('https://car-server-eight.vercel.app/users', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(res => res.json())
          .then(data => console.log(data))
        toast.success('Registered successfully');
        reset();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  }
  // login user with google popup
  const googlePouplogin = () => {
    googlePopUp()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userBuyer = {
          email: user?.email,
          fullName: user?.displayName,
          select: "Buyer",
        }
        console.log(user);
        if (serverUser?.email !== user?.email) {
          fetch('https://car-server-eight.vercel.app/users', {
            method: "POST",
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(userBuyer),
          })
            .then(res => res.json())
            .then(data => console.log(data))
        } else {
          swal("Hello Buyer", "Welcome to car buy-sell website");
        }

        const email = {
          email: user.email,
        };
        // userData
        fetch('https://car-server-eight.vercel.app/jwt', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(email)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('key', data.token);
            // console.log(data)
          })
        toast.success('login successfully');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
              <form onSubmit={handleSubmit(userDataRegister)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full-Name</span>
                  </label>
                  <input type="text" {...register("fullName", { required: true })} placeholder="full-name" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                </div>
                <div className="form-control mt-3">
                  <select {...register("select", { required: true })} className="select w-full max-w-xs border-1 border-gray-300">
                    <option disabled selected>What are you</option>
                    <option>Buyer</option>
                    <option>Seller</option>
                  </select>
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
                <div className="divider">OR</div>
                <div className="form-control mt-6">
                  <button onClick={googlePouplogin} className="btn bg-[#8D9EFF] border-none font-bold text-slate-800 hover:bg-[#9ba9fa]"><FcGoogle className='text-4xl mr-1'></FcGoogle>continue with google</button>
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