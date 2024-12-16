import React from 'react'
import logo from '../assets/Images/IMRLogo.png';

function dashboard() {
    return (
        <div className="page-wrapper compact-wrapper" id="pageWrapper">
            <div className="page-body-wrapper">
                <div className="page-body">
                    <div className="container-fluid ">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-sm-12">
                                <div className="card mt-5">
                                    <div className="card-body text-center">
                                        <img className="light-logo img-fluid" src={logo} alt="logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard
