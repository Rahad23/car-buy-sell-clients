import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Payment from '../Payment';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);
// console.log(stripePromise)
const ChackOutFrom = () => {
    const data = useLoaderData();
    const {buyerEmail,buyerFullName,sellerName,sellerPrice,series,img}=data;
    return (
        <div className='mt-24'>
        <h1 className='text-center mb-9 font-semibold text-4xl text-emerald-800'>Payment-Now</h1>
        <div className="card mx-auto card-compact w-[500px] bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">Seller: <span className='text-black'>{sellerName}</span></h2>
            <div>
            <h2 className='text-lg font-semibold'>Price: <span className='text-black'>${sellerPrice}</span></h2>
            <div>
        <Elements stripe={stripePromise}>
                <Payment
                sellerPrice={sellerPrice}
                data={data}
                ></Payment>
         </Elements>
            </div>
            </div>
        </div>
        </div>
    </div>
    );
};
export default ChackOutFrom;