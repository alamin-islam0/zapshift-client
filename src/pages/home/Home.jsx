import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import HowItWork from '../../components/HomeComponents/HowItWork';
import OurServices from '../../components/HomeComponents/OurServices';

const Home = () => {
    return (
        <div className='px-4 lg:px-0'>
            <HeroSection/>
            <HowItWork/>
            <OurServices/>
        </div>
    );
};

export default Home;