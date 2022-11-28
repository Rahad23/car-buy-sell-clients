import React, { useEffect, useState } from 'react';
import AstonMartinCard from './astonMartinCard/AstonMartinCard';

const AstonMartin = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    // console.log(data);
    useEffect(() => {
        fetch('https://car-server-eight.vercel.app/astonMartin', {
            headers: {
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    return (
        <>
            {
                loader && loader && <div className='flex justify-center items-center mt-56 mb-60'><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div></div>
            }
            <div className='lg:grid grid-cols-3 flex flex-col container mx-auto gap-8 mt-28'>
                {
                    data.map(data => <AstonMartinCard loader={setLoader} key={data?._id} data={data}></AstonMartinCard>)
                }
            </div>
        </>
    );
};

export default AstonMartin;