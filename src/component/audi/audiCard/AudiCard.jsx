import React from 'react';
import { Link } from 'react-router-dom';
import { FiCornerDownRight } from 'react-icons/fi';

const AudiCard = ({data, loader}) => {
    const {img,introducedYear,introduction,details,price,series,_id} =data;
    const sortDetails = details.slice(0, 80)+"...";
    return (
        <div>
        <Link to={`/AUDIdetail/${_id}`}>
        <div className="card lg:w-96 w-80 mx-auto bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">
            {series}
            </h2>
            <p className='font-bold text-slate-900'>price: ${price}</p>
            <p>{sortDetails}</p>
            <div className="card-actions justify-end">
                <Link title='Read-More' to={`/AUDIdetail/${_id}`} className="bg-green-500 p-3 rounded-full">
                  <FiCornerDownRight className='text-xl font-bold text-white'></FiCornerDownRight>
                </Link>
            </div>
        </div>
        </div>
        </Link>
        {
            loader(false)
        }
    </div>
    );
};

export default AudiCard;