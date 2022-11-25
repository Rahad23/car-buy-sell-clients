import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { CarContext } from './../contextApi/ContextApi';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    // use context get dataBase user Data
    const {serverUser}=useContext(CarContext);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    // react day picker
    const [selectedDate, setSelectedDate]=useState(new Date());
    const date = format(selectedDate, "PP");
    // img hosting imgbb
    const imgHostKey = process.env.REACT_APP_IMGBB_KEY;
    if(serverUser?.select!=="Seller"){
        return navigate('/');
    }
    const addCarData=(data)=>{
        const verify = window.confirm("will you be a verify user?");
        const {PurchaseYear,carName,series,usesYears, picture,carDetails,phoneNumber,select,price}=data;
        const image = picture[0];
        const formData= new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imgHostKey}`;
        fetch(url,{
            method: "POST",
            body: formData,
        })
        .then(res=>res.json())
        .then(data=>{
            const {url}=data?.data;
            if(url){
                const dataAdd={  
                    series: series,
                    img:url,
                    introducedYear: PurchaseYear,
                    introduction: usesYears,
                    details: carDetails,
                    users: verify,
                    submitTime:date,
                    company: select,
                    price:price,
                    userName:serverUser?.fullName,
                    phone: phoneNumber
                }
                if(select==="BMW"){
                    fetch('http://localhost:5000/bmw',{
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(dataAdd)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data?.acknowledged){
                            swal("Success-full", `${select} car add successfully`, "success");
                        }
                        reset();
                        // console.log(data)
                    })
                }else if(select==="AUDI"){
                    fetch('http://localhost:5000/audi',{
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(dataAdd)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data?.acknowledged){
                            swal("Success-full", `${select} car add successfully`, "success");
                        }
                        reset();
                        // console.log(data)
                    })
                }else if(select === "ASTON"){
                    fetch('http://localhost:5000/astonMartin',{
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(dataAdd)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        if(data?.acknowledged){
                            swal("Success-full", `${select} car add successfully`, "success");
                        }
                        reset();
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'select company',
                      })
                }
            }
        })

    }
    return (
        <div>
            <div className="hero mt-16">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold mb-2">Add-Cars</h1>
    </div>
    <div className="card flex-shrink-0 w-[500px] max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <form onSubmit={handleSubmit(addCarData)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">car-name**</span>
          </label>
          <input type="text" {...register("carName", { required: true })}  placeholder="car-name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Series**</span>
          </label>
          <input type="text" {...register("series", { required: true })}  placeholder="series" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Purchase-Year**</span>
          </label>
          <input type="number" {...register("PurchaseYear", { required: true })}  placeholder="Purchase Year" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price**</span>
          </label>
          <input type="number" {...register("price", { required: true })}  placeholder="price" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">How many years has it been used?</span>
          </label>
          <input type="number" {...register("usesYears", { required: true })}  placeholder="How-many-years-has-it-been-used" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone**</span>
          </label>
          <input type="number" {...register("phoneNumber", { required: true })}  placeholder="Your-Phone-Number" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Add car picture**</span>
          </label>
          <input type="file" {...register("picture", { required: true })}  placeholder="How-many-years-has-it-been-used" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select-Company**</span>
          </label>
          <select {...register("select", { required: true })} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Company</option>
            <option>BMW</option>
            <option>ASTON</option>
            <option>AUDI</option>
    </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Car details type here**</span>
          </label>
          <textarea {...register("carDetails", { required: true })} className="textarea textarea-bordered" placeholder="type car details"></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit'>submit</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default AddProduct;