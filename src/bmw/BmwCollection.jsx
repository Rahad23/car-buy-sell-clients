import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import BmwCard from './bmwCard/BmwCard';

const BmwCollection = () => {
const [data, setData]=useState([]);
const [loader, setLoader]=useState(true);
// console.log(data);
    useEffect(()=>{
        fetch('http://localhost:5000/bmw',{
            headers:{
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setData(data))
    },[])

    return (
        <>
        {
            loader && <div className='flex justify-center items-center mt-56 mb-60'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div></div>
        }
        <div className='grid grid-cols-3 container mx-auto gap-8 mt-28'>
            {
                data.map(data=><BmwCard key={data?._id} loader={setLoader} data={data}></BmwCard>)
            }
        </div>
        </>
    );
};

export default BmwCollection;