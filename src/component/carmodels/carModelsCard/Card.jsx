import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({data}) => {
    console.log(data);
    const {carName, url, _id}=data;

    return (
        <div>
           <Link to={`/${carName}`}>
           <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img src="" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{carName}</h2>
                </div>
            </div>
           </Link>
        </div>
    );
};

export default Card;