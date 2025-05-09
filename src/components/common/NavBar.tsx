import React from 'react'
import './css/navbar.css'
import BlueLogo from '../../assets/WhiteLogo.svg'
import ProfDefault from '../../assets/profdefault.png'

export const NavBar = () => {
    return (
        <div className='navBar flex between'>
            <div>
                <div className="flex between">
                    <img src={BlueLogo} className='logo' alt="blue logo" />
                    <div className='flex column' >
                        <h3>Comapny Name</h3>
                        <h4>Visitor Mnagement</h4>
                    </div>

                </div>
            </div>
            <div className="profArea centerV flex">
                <h4 className='sm-d-none' >name will goes here</h4>
                <img src={ProfDefault} alt="profile-image" className='profile-image' />
            </div>
        </div>


    )
}
