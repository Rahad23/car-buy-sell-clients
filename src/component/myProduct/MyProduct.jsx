import React, { useContext, useEffect, useState } from 'react';
import { CarContext } from '../contextApi/ContextApi';
import MyProductCard from './myProductCard/MyProductCard';
import { Link } from 'react-router-dom';

const MyProduct = () => {
    const { userData, serverUser } = useContext(CarContext);
    // console.log(serverUser)
    const [bmwProduct, setBmwProduct] = useState([])
    const [audiProduct, setaudiProduct] = useState([])
    const [astonProduct, setastonProduct] = useState([])

    useEffect(() => {
        fetch(`https://car-server-eight.vercel.app/bmwSeller/${userData?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
            .then(res => res.json())
            .then(data => setBmwProduct(data))
    }, [userData?.email])

    useEffect(() => {
        fetch(`https://car-server-eight.vercel.app/audiSeller/${userData?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
            .then(res => res.json())
            .then(data => setaudiProduct(data))
    }, [userData?.email])

    useEffect(() => {
        fetch(`https://car-server-eight.vercel.app/astonSeller/${userData?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
            .then(res => res.json())
            .then(data => setastonProduct(data))
    }, [userData?.email])

    const myAllProduct = [...bmwProduct, ...audiProduct, ...astonProduct];

    //    useEffect(()=>{
    //     fetch('https://car-server-eight.vercel.app/myProduct',{
    //         method:"POST",
    //         headers:{
    //             'content-type':'application/json',
    //         },
    //         body: JSON.stringify(myAllProduct)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>console.log(data))
    //    },[myAllProduct])

    return (
        <div className='mt-20 container mx-auto'>
            {
                myAllProduct.length > 0 ? <h1 className='text-2xl text-slate-900 font-semibold text-center'>Total-Product: {myAllProduct.length}</h1>
                    :
                    <h1 className='text-2xl text-slate-900 font-semibold text-center'>You have not added a product yet. Click here to add <Link to={'/'} className='text-green-800 font-semibold'>(Add-Now)</Link></h1>
            }

            <div className='grid grid-cols-3 mt-10'>
                {
                    myAllProduct.map((data, i) => <MyProductCard key={data?._id} data={data}></MyProductCard>)
                }
            </div>
        </div>
    );
};

export default MyProduct;