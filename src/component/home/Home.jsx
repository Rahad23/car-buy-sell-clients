import React from 'react';
import Slider from '../../slider/Slider';
import CarDetails from '../carDetails/CarDetails';
import Carmodels from '../carmodels/Carmodels';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CarDetails></CarDetails>
            <Carmodels></Carmodels>
        </div>
    );
};

export default Home;