import React, { useContext, useEffect, useState } from 'react';
import { CarContext } from './../contextApi/ContextApi';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const ModalBooking = ({data, modalClose}) => {

    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm();
    const {details,img,phone,price,series,submitTime,userName,_id, company}=data;
    const {userData} = useContext(CarContext);
    const [ServerUser, setServerUser] = useState([]);
    const {select,fullName,email} = ServerUser;
    useEffect(()=>{
        if(userData?.email){
            fetch(`http://localhost:5000/users/${userData?.email}`)
            .then(res=>res.json())
            .then(data=>setServerUser(data))
        }
    },[userData?.email])

    // modal close
    // const [show, setShow] = useState(true);

    // const handleShow = (data) => {
    //    return setShow(data)
    // };
    // use-query
    // const {  ServerUserdata:datas, refetch } = useQuery({
    //         queryKey: ['appointmentOption'],
    //         queryFn: ()=> fetch(`http://localhost:5000/users/${userData?.email}`)
    //        .then(res=>res.json())
    //     })
    //     setServerUser(datas);
    // form data
    const navigate = useNavigate();
    const orderDetails=(data)=>{
        const {buyerEmail,buyerFullName,buyerMessage,sellerName,sellerPhone,sellerPrice}=data;
        if(buyerEmail && buyerFullName && buyerMessage && sellerName && sellerPhone && sellerPrice){
            const orderData={
                buyerEmail,
                buyerFullName,
                buyerMessage,
                sellerName,
                sellerPhone,
                sellerPrice,
                img,
                series,
                company
            }
            fetch('http://localhost:5000/buyerOrder',{
                method: "POST",
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify(orderData),
            })
            .then(res=>res.json())
            .then(data=>{
                if(data?.acknowledged){
                    reset();
                    swal("Order-Completed", "Seller will call you, wait 5 minutes", "success");
                    if(company==='ASTON'){
                        navigate(`/Aston-Martin`);
                    }else{
                        navigate(`/${company}`);
                    }

                }
                // console.log(data)
            })

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops!!',
                text: 'Please focus all field and type product receive address',
              })
        }

    }
    return (
        <div>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="buyNowModal" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="buyNowModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
<form onSubmit={handleSubmit(orderDetails)}>
  <div className="hero-content flex-col">
    <div className="card w-[500px] bg-base-100">
      <div className="card-body">
        {/* seller information */}
            <h1 className='text-xl font-semibold text-slate-900'>Seller-Information</h1>
            <div className='form-control mt-4'>
                <div>
                  <h1 className='font-semibold text-xl'>{company}:- {series}</h1>
                <img src={img} alt="" />
                </div>
        </div>
            <div className='form-control'>
        <label className="label">
            <span className="label-text">Name**</span>
          </label>
          <input type="text" {...register("sellerName")} defaultValue={userName} readOnly placeholder="name" className="input input-bordered" />
        </div>
        <div className='form-control'>
        <label className="label">
            <span className="label-text">Phone**</span>
          </label>
          <input type="text" {...register("sellerPhone")} defaultValue={phone} readOnly placeholder="name" className="input input-bordered" />
        </div>
        <div className='form-control'>
        <label className="label">
            <span className="label-text">Price-$</span>
          </label>
          <input type="text" {...register("sellerPrice")} defaultValue={price} readOnly placeholder="name" className="input input-bordered" />
        </div>
        <br />
        <hr />
        <br />
        <h1 className='text-xl font-semibold text-slate-900'>Buyer-Information</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email**</span>
          </label>
          <input type="email" {...register("buyerEmail")} defaultValue={email} readOnly placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name**</span>
          </label>
          <input type="text" {...register("buyerFullName")} defaultValue={fullName} readOnly placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message**</span>
          </label>
          <textarea {...register("buyerMessage",{ required: "Please focus all field and type product receive address" } )} className="textarea textarea-bordered" placeholder="Message-your-details"></textarea>
          <p className='text-red-600'>{errors.buyerMessage?.message}</p>
        </div>
        <div className="form-control mt-6">  
               <button type='submit' className="btn bg-[#1C181C] hover:bg-[#141214]">submit</button>
        </div>
      </div>
    </div>
  </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default ModalBooking;