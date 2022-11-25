import React, { useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router-dom';
import ModalBooking from '../../modal/ModalBooking';

const AudiDetails = () => {
    const data =useLoaderData();

    // console.log(data)
    const {details,img,introducedYear,introduction,price,series,_id,userName,user,submitTime,phone}=data;
    return (
        <div>
        <div className="card mx-auto mt-32 w-[500px] bg-base-100 shadow-xl">
<figure><img src={img} alt="Shoes" /></figure>
<div className="card-body">
<div className='flex justify-between text-xl font-bold'>
<h2 className="card-title p-1">
  {series}
</h2>
    <div className='indicator p-1'>
        {
            user ?    <>
            {/* <img className='indicator-item badge' src={gifActice} alt="" /> */}
            <span title='User-verified' className="cursor-pointer indicator-item badge bg-[#02fd02] w-1 border-none"></span>
            <h2><span className='text-[#009EFF]'>Seller:-</span> {userName}</h2></> 
            :
            <>
            <h2><span className='text-[#009EFF]'>Seller:-</span> {userName}</h2>
            </>

        }

    </div>
</div>
<div className='flex justify-between'>
<h2 className='text-slate-900 font-bold'>price: ${price}</h2>
<h2 className='text-slate-900 font-bold'>call: +88{phone}</h2>
</div>
<div className='flex justify-between'>
<h2 className='text-slate-900 font-semibold'>uses: {introducedYear}-{introduction}</h2>
<h1 className='text-slate-900 font-bold'>upload: <span className='text-red-600'>{submitTime}</span></h1>
</div>
<p>{details}</p>
<div className="card-actions justify-between items-center mt-5">
  <Link to={'/Audi'}>
   <BsArrowLeft className='text-2xl font-bold text-slate-900'></BsArrowLeft>
  </Link>
 <div className='card-actions flex justify-end'>
 <label htmlFor="buyNowModal" className="btn btn-sm">buy-now</label>
  <button className="btn btn-sm bg-[#0162bd] border-none hover:bg-[#0162bd]">add-to-cart<BiCart className='text-3xl'></BiCart></button>
 </div>
</div>
</div>
</div>
<ModalBooking data={data} ></ModalBooking>
    </div>
    );
};

export default AudiDetails;