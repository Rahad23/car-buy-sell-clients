import React, { useContext, useEffect, useState } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { CarContext } from './../contextApi/ContextApi';
import { Link, useNavigate } from 'react-router-dom';

const MyOrder = () => {
const {userData,serverUser} = useContext(CarContext);
  const navigate = useNavigate();
    const {  data:myOrder = [], refetch, isLoading } = useQuery({
        queryKey: ['myOrder', userData?.email],
         queryFn: async()=> fetch(`http://localhost:5000/myOrder/${userData?.email}`,{
            headers:{
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
         })
        .then(res=>res.json())
    })
    if(serverUser?.select!=="Buyer"){
        return navigate('/');
    }
    const orderDataHandle=(_id)=>{
       const confirmed = window.confirm("You want to delete this order");
       if(confirmed){
        fetch(`http://localhost:5000/myOrder/${_id}`,{
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            refetch();
        })
       }
       
   }
if(isLoading){
    return <div className='flex justify-center items-center mt-56 mb-60'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div></div>
}
    return (
        <div className='container mx-auto mt-20'>
            <h1 className='text-2xl text-center mb-8 font-semibold text-slate-900'>My Orders</h1>
            <div className="overflow-x-auto">
                {
                    myOrder.length >0 ? 

<table className="table lg:w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>img</th>
        <th>car</th>
        <th>seller</th>
        <th>phone</th>
        <th>price</th>
        <th>action</th>
        <th>payment</th>
      </tr>
    </thead>
    <tbody>
      {
        myOrder.map((data, i)=>
        // console.log(data)
            <tr>
                <th>{i + 1}</th>
        <th>
            <img className='w-32 rounded-lg' src={data?.img} alt="" />
        </th>
        <td>{data?.company}-{data?.series}</td>
        <td>{data?.sellerName}</td>
        <td>{data?.sellerPhone}</td>
        <td>${data?.sellerPrice}</td>
        <td><button onClick={()=>orderDataHandle(data?._id)} disabled={data?.pay ? true : false} className="btn btn-sm bg-red-600 border-none">delete</button></td>
        <td>
            {
    !data?.pay ? <Link to={`/payment/${data?._id}`} className="btn btn-sm bg-green-600 hover:bg-green-700 border-none">Pay-now</Link>
    :
    <p title='Payment-Completed' className='text-green-600 cursor-pointer font-bold text-lg'>Complete</p>
            }
            </td>
      </tr>
            )
      }
    </tbody>
  </table>
           :
           <div>
            <h1 className='text-center'>You have not placed any orders yes. <Link to={'/'} className='text-red-600'>see-product</Link></h1>
           </div>   
           }
  
</div>
        </div>
    );
};

export default MyOrder;