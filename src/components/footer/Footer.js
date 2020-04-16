
import React from 'react';

import './Footer.scss';

const Footer = () => {
    const year = () => {
        return new Date().getFullYear();
    }

    return (
        <footer className="footer">
            @copyright {year()}
        </footer>
    )
}

export default Footer;