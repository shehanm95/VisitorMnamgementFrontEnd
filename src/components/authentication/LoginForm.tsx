import React from 'react'
import { NavBar } from '../common/NavBar'
import './authenticationForm.css'
import { BlueLogo } from '../common/BlueLogo'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
    return (
        <div>
            <NavBar />
            <div className="maincontainer flex center">
                <div className="authenticationForm">
                    <div className="logoArea flex center">
                        <BlueLogo />
                    </div>
                    <h3 className='mt-4' >Login</h3>
                    <div className='w-100 bigInputFields mt-3 '>

                        <input type="text" placeholder='Email' /><i className="fa-solid fa-at"></i>
                    </div>

                    <div className='w-100 bigInputFields mt-3 '>

                        <input type="password" placeholder='Password' /><i className="fa-solid fa-lock"></i>
                    </div>

                    <div className=" p-1 rememberArea flex centerV mt-3 between">
                        <div><input type="checkbox" name="remeberme" id="" /> <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button className="bigButton w-100">Login</button>
                    <div className="formbottom flex center"><span>Don't have and account ?</span><Link to="/register">Register</Link> </div>
                </div>
            </div>
        </div>
    )
}
