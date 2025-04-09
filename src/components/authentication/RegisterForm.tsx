import React from 'react';
import { NavBar } from '../common/NavBar';
import './authenticationForm.css'
import { BlueLogo } from '../common/BlueLogo';
import { Link } from 'react-router-dom';


export const RegisterForm = () => {
    return (
        <div>
            <NavBar />
            <div className="maincontainer flex center">
                <div className="authenticationForm">
                    <div className="logoArea flex center">
                        <BlueLogo />
                    </div>
                    <h3 className="mt-4">Register</h3>
                    <div className="w-100 bigInputFields mt-3">
                        <input type="email" placeholder="Email" />
                        <i className="fa-solid fa-at"></i>
                    </div>

                    <div className="w-100 bigInputFields mt-3">
                        <input type="tel" placeholder="WhatsApp Number" />
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>

                    <div className="w-100 bigInputFields mt-3">
                        <input type="password" placeholder="Password" />
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="w-100 bigInputFields mt-3">
                        <input type="password" placeholder="Confirm Password" />
                        <i className="fa-solid fa-lock"></i>
                    </div>

                    <div className="p-1 rememberArea flex centerV mt-3 between">
                        <div>
                            <input type="checkbox" name="rememberme" id="rememberme" />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                    </div>

                    <button className="bigButton w-100">Register</button>
                    <div className="formbottom flex center">
                        <span>Already have an account?</span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};