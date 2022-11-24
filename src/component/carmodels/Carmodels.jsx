import React, { useEffect, useState } from 'react';
import Card from './carModelsCard/Card';

const Carmodels = () => {
    const [carData, setCarData] = useState([]);
    useEffect(()=>{
        fetch('car.json')
        .then(res=>res.json())
        .then(data=>setCarData(data))
    },[])
    return (
        <div className='mt-24 container mx-auto'>
            <h1 className='text-3xl text-center text-red-700 font-semibold'><span className='text-green-800 font-bold text-4xl'>Car</span> Models</h1>
            <div className='grid grid-cols-3 mt-20'>
                {
                    carData.map((data, i)=><Card key={i} data={data}></Card>)
                }
            </div>
        </div>
    );
};

export default Carmodels;