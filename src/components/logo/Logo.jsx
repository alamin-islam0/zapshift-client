import React from 'react';
import SiteLogo from '../../assets/logo.svg'
import FooterLogo from '../../assets/FooterLogo.svg'

// Header Logo
const Logo = () => {
    return (
        <div>
            <img src={SiteLogo} alt="" className="" />
        </div>
    );
};
// Footer Logo
export const FootLogo = () => {
    return (
        <div>
            <img src={FooterLogo} alt=""/>
        </div>
    )
}

export default Logo;