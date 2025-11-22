import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import HowItWork from '../../components/HomeComponents/HowItWork';

const Home = () => {
    return (
        <div className='px-4 lg:px-0'>
            <HeroSection/>
            <HowItWork/>
        </div>
    );
};

export default Home;