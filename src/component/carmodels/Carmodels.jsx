import React, { useEffect, useState } from 'react';
import Card from './carModelsCard/Card';

const Carmodels = () => {
    const [carData, setCarData] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/carQuality')
        .then(res=>res.json())
        .then(data=>setCarData(data))
    },[])
    return (
        <div className='mt-24 container mx-auto'>
            <h1 className='text-3xl text-center text-red-700 font-semibold'><span className='text-green-800 font-bold text-4xl'>Car</span> Companies</h1>
            <p className='text-center text-lg font-semibold mt-2'>We only get second hand cars of these 3 companies.</p>
            <div className='lg:grid grid-cols-3 flex flex-col gap-8 mt-24'>
                {
                    carData.map((data, i)=><Card key={i} data={data}></Card>)
                }
            </div>
        </div>
    );
};

export default Carmodels;