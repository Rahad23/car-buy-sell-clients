import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import AdvertiseCard from './advertiseCard/AdvertiseCard';

const Advertisement = () => {
    const [add, setAdd]=useState([]);
useEffect(()=>{
    fetch('http://localhost:5000/advertise',{
        headers:{
            authorization: `bearer ${localStorage.getItem('myKey')}`
        }
    })
    .then(res=>res.json())
    .then(data=>setAdd(data))
},[add])
    return (
<>
{
            add.length && 
            <div className='mt-28 container mx-auto'>
            <h1 className='text-2xl text-gray-900 font-bold text-center mb-8'>Advertisement</h1>
            {
                add.map(data=><AdvertiseCard key={data?._id} data={data}></AdvertiseCard>)
            }

        </div>
        }
</>
      
    );
};

export default Advertisement;