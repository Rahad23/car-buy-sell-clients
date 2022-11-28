import React, { useContext } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CarContext } from './../contextApi/ContextApi';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';
import swal from 'sweetalert';

const Login = () => {
  const { loginUserEmailPassword, userData, googlePopUp, serverUser } = useContext(CarContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // console.log(serverUser);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  // if(userData && userData?.email){
  // //  return  navigate(from, { replace: true });
  // }

  const loginData = (data) => {
    const { email, password } = data;
    loginUserEmailPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = {
          email: user.email
        };
        fetch('https://car-server-eight.vercel.app/jwt', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(email)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('myKey', data.token);
            // console.log(data)
          })

        navigate(from, { replace: true });
        toast.success('login successfully');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });

  }
  // user login google popup
  const googlePopupLogin = () => {
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
        fetch('https://car-server-eight.vercel.app/jwt', {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(email)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('myKey', data.token);
            // console.log(data)
          })
        toast.success('login successfully');
        navigate('/');
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
                <div className="divider">OR</div>
                <div className="form-control mt-6">
                  <button onClick={googlePopupLogin} className="btn bg-[#8D9EFF] border-none font-bold text-slate-800 hover:bg-[#9ba9fa]"><FcGoogle className='text-4xl mr-1'></FcGoogle>continue with google</button>
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