import React from 'react';
import Slider from '../../slider/Slider';
import Advertisement from '../advertisement/Advertisement';
import CarDetails from '../carDetails/CarDetails';
import Carmodels from '../carmodels/Carmodels';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CarDetails></CarDetails>
            <Carmodels></Carmodels>
            <Advertisement></Advertisement>
        </div>
    );
};

export default Home;