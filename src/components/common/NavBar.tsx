import React, { useContext } from 'react'
import './css/navbar.css'
import BlueLogo from '../../assets/WhiteLogo.svg'
import ProfDefault from '../../assets/profdefault.png'
import { WhiteLogo } from './WhiteLogo'
import { UserContext } from '../../context/ContextProvider'

export const NavBar = () => {
    const { user } = useContext(UserContext)
    let firstName = user?.firstName;
    let lastName = user?.lastName;


    return (
        <div className='navBar flex between'>
            <div>
                <div className="flex between">
                    <WhiteLogo></WhiteLogo>
                </div>
            </div>
            <div className="profArea centerV flex">
                {user && <>
                    <h4 className='sm-d-none' >{firstName} {lastName}</h4>
                    <img src={ProfDefault} alt="profile-image" className='profile-image' />
                </>}
                {!user && <>
                    <h4 className='sm-d-none' >name will goes here</h4>
                    <img src={ProfDefault} alt="profile-image" className='profile-image' /></>}
            </div>
        </div>


    )
}
