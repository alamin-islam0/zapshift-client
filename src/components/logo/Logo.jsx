import React from 'react';
import SiteLogo from '../../assets/logo.svg'
import FooterLogo from '../../assets/FooterLogo.svg'

// Header Logo
const Logo = () => {
    return (
        <div>
            <img src={SiteLogo} alt="" srcset="" className="h-8" />
        </div>
    );
};
// Footer Logo
export const FootLogo = () => {
    return (
        <div>
            <img src={FooterLogo} alt="" srcset="" />
        </div>
    )
}

export default Logo;