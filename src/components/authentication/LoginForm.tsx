import React from 'react'
import { NavBar } from '../common/NavBar'
import './authenticationForm.css'
import { BlueLogo } from '../common/BlueLogo'

export const LoginForm = () => {
    return (
        <div>
            <NavBar />
            <div className="maincontainer flex center">
                <div className="authenticationForm">
                    <div className="logoArea flex center">
                        <BlueLogo />
                    </div>
                    <h3>Login</h3>
                    <input className='w-100' type="text" />
                    <input className='w-100' type="password" />
                    <div className="rememberArea flex centerV between">
                        <div><input type="checkbox" name="remeberme" id="" /> <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button className="bigButton w-100">Login</button>
                    <div className="formbottom flex center"><span>Don't have and account ?</span><a href="#">Register</a></div>
                </div>
            </div>
        </div>
    )
}
