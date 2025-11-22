import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import HowItWork from '../../components/HomeComponents/HowItWork';
import OurServices from '../../components/HomeComponents/OurServices';
import DeliveryPartner from '../../components/HomeComponents/DeliveryPartner';
import BannerSection from '../../components/HomeComponents/BannerSection';
import Testimonials from '../../components/HomeComponents/Testimonials';

const Home = () => {
    return (
        <div className='px-4 lg:px-0'>
            <HeroSection/>
            <HowItWork/>
            <OurServices/>
            <DeliveryPartner/>
            <BannerSection/>
            <Testimonials/>
        </div>
    );
};

export default Home;