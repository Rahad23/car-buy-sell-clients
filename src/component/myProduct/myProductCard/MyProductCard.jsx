import React from 'react';
import { Link } from 'react-router-dom';

const MyProductCard = ({data}) => {
    const {company,details,img,price,series}=data;
    const sortDetails = details.slice(0, 80)+"...";
    console.log(data);
    return (
        <div className=''>
            <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                 {company} {series}
                </h2>
                <p className='text-lg font-semibold text-slate-900'>price:- ${price}</p>
                <p>{sortDetails}</p>
                <div className="card-actions justify-between">
                <Link to={`/addvertise/${data?._id}`} className="btn btn-sm bg-green-900 hover:bg-emerald-500 border-none">add-advertisement</Link> 
              <div className='flex justify-between'>
              <button className="btn btn-sm mr-1 bg-green-700 hover:bg-green-800 border-none">edit</button> 
                <button className="btn btn-sm bg-red-600 hover:bg-red-700 border-none">delete</button>
              </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default MyProductCard;