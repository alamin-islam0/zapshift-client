import React from 'react';
import { Outlet } from 'react-router';
import Header from '../pages/shared/header/Header';
import Footer from '../pages/shared/footer/Footer';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <header>
                <Header/>
            </header>
            <Outlet></Outlet>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default RootLayouts;