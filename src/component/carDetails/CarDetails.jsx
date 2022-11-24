import React from 'react';
import img1 from '../../Assets/carInformetion/1.png';
import img2 from '../../Assets/carInformetion/2.png';
import img3 from '../../Assets/carInformetion/3.png';
import img4 from '../../Assets/carInformetion/4.png';

const CarDetails = () => {
    return (
        <div className='mt-28 container mx-auto'>
            <div className='lg:grid grid-cols-4 flex flex-col gap-8 lg:gap-0'>
            <div className="card w-64 bg-base-100 p-4 lg:p-0 mx-auto shadow-2xl">
        <figure><img className='w-[35%]' src={img1} alt="Shoes" /></figure>
     <div className="card-body">
     <h1 className='text-2xl text-center font-bold text-[#484848]'>Latest Cars</h1>
  </div>
</div>
<div className="card w-64 bg-base-100 p-4 lg:p-0 mx-auto shadow-2xl">
        <figure><img className='w-[35%]' src={img2} alt="Shoes" /></figure>
     <div className="card-body">
     <h1 className='text-2xl text-center font-bold text-[#484848]'>Low Odometer</h1>
  </div>
</div>
<div className="card w-64 bg-base-100 p-4 lg:p-0 mx-auto shadow-2xl">
        <figure><img className='w-[35%]' src={img3} alt="Shoes" /></figure>
     <div className="card-body">
     <h1 className='text-2xl text-center font-bold text-[#484848]'>Original Engine</h1>
  </div>
</div>
<div className="card w-64 bg-base-100 p-4 lg:p-0 mx-auto shadow-2xl">
        <figure><img className='w-[35%]' src={img4} alt="Shoes" /></figure>
     <div className="card-body">
     <h1 className='text-2xl text-center font-bold text-[#484848]'>Certified Tire</h1>
        
  </div>
</div>
            </div>
        </div>
    );
};

export default CarDetails;