import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdvertiseCard = ({data}) => {
    const {company,details,img,introducedYear,introduction,price,userName,series}=data;
    const sortDetails = details.slice(0, 80)+"...";
    console.log(data);
    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl mb-10">
            <figure><img className='w-[350px]' src={img} alt="Movie"/></figure>
            <div className="card-body">
                <h2 className="card-title">{company+" "+ series}</h2>
                <p className='text-md text-gray-900 font-normal'>{sortDetails}</p>
                <p className='text-md text-gray-900 font-semibold'>(Buy {introducedYear} - Uses {introduction})</p>
                <p className='text-lg font-bold text-red-600'><span className='text-black'>Price:-</span> <span className='text-green-900'>$</span>{price}</p>
                <div className="card-actions justify-end">
                    {
                        company==="ASTON" && 
                        <Link to={`/Aston-Martin/${data?._id}`} className="btn btn-primary">Buy-Now</Link>
                    }
                    {
                        company==="AUDI" && 
                        <Link to={`/AUDIdetail/${data?._id}`} className="btn btn-primary">Buy-Now</Link>
                    }
                    {
                        company==="BMW" && 
                        <Link to={`/BMWdetail/${data?._id}`} className="btn btn-primary">Buy-Now</Link>
                    }                    
                
                </div>
            </div>
            </div>
        </div>
    );
};

export default AdvertiseCard;