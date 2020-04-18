
import React from 'react';

import './footer.scss';

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