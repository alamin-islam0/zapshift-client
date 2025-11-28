import React from 'react';
import AuthSvg from '../assets/AuthVector.svg'
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router';
import Login from '../pages/auth/login/Login';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='w-2xs'>
                <Logo/>
            </div>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <Outlet>
                        <Login/>
                    </Outlet>
                </div>
                <div className='flex-1'>
                    <img src={AuthSvg} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;