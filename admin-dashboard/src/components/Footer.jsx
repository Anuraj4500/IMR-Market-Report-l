// Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 footer-copyright">
                        <p className="mb-0">Copyright 2024 © AKvis Intelligence</p>
                    </div>
                    <div className="col-md-6">
                        <p className="float-end mb-0">
                            <svg className="svg-color footer-icon">
                                <use href="../assets/svg/iconly-sprite.svg#heart"></use>
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
