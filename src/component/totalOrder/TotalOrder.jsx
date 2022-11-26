import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TotalOrder = () => {
    const [totalOrder, setTotalOrder] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/buyerOrder',{
          headers:{
            authorization: `bearer ${localStorage.getItem('myKey')}`
         }
        })
        .then(res=>res.json())
        .then(data=>setTotalOrder(data))
    },[totalOrder])
    const orderDataHandle=(id)=>{
       const response = window.confirm('Dear admin you want to delete this order');
       if(response){
        fetch(`http://localhost:5000/buyerOrder/${id}`,{
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
       }
    }
    return (
        <div className='container mx-auto mt-20'>
            <h1 className='text-2xl text-center mb-8 font-semibold text-slate-900'>Customer-Order</h1>
            <div className="overflow-x-auto">
                {
                    totalOrder.length >0 ? 

<table className="table w-full">
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
      </tr>
    </thead>
    <tbody>
      {
        totalOrder.map((data, i)=>
            <tr key={i}>
                <th>{i + 1}</th>
        <th>
            <img className='w-32 rounded-lg' src={data?.img} alt="" />
        </th>
        <td>{data?.company}-{data?.series}</td>
        <td>{data?.sellerName}</td>
        <td>{data?.sellerPhone}</td>
        <td>${data?.sellerPrice}</td>
        <td><button onClick={()=>orderDataHandle(data?._id)} className="btn btn-sm bg-red-600 border-none">delete</button></td>
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

export default TotalOrder;