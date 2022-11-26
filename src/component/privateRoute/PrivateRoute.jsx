import React, { useContext } from 'react';
import { CarContext } from './../contextApi/ContextApi';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {userData, loader}=useContext(CarContext);
    const location = useLocation();
    // const navigate = useNavigate();
    if(loader){
        return <div className='flex justify-center items-center mt-56 mb-60'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div></div>
    }else{
        if(userData && userData?.email){
            return (
                <div>
                    {children}
                </div>
            );
        }
        return  <Navigate to={'/login'} state={{from:location}} replace></Navigate>
    }
  
   
};

export default PrivateRoute;