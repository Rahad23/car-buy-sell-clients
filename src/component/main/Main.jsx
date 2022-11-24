import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navebar from '../navebar/Navebar';

const Main = () => {
    return (
        <div>
            <Navebar></Navebar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;