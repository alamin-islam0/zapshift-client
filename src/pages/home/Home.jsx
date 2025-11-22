import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import HowItWork from '../../components/HomeComponents/HowItWork';
import OurServices from '../../components/HomeComponents/OurServices';
import DeliveryPartner from '../../components/HomeComponents/DeliveryPartner';

const Home = () => {
    return (
        <div className='px-4 lg:px-0'>
            <HeroSection/>
            <HowItWork/>
            <OurServices/>
            <DeliveryPartner/>
        </div>
    );
};

export default Home;