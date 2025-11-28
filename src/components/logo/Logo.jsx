import React from 'react';
import SiteLogo from '../../assets/logo.svg'
import FooterLogo from '../../assets/FooterLogo.svg'
import { Link } from 'react-router';

// Header Logo
const Logo = () => {
    return (
        <div>
            <Link to={"/"}><img src={SiteLogo} alt="" className="" /></Link>
        </div>
    );
};
// Footer Logo
export const FootLogo = () => {
    return (
        <div>
            <Link to={"/"}><img src={FooterLogo} alt=""/></Link>
        </div>
    )
}

export default Logo;