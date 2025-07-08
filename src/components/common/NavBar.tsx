import React, { useContext, useEffect, useState } from 'react'
import './css/navbar.css'
import BlueLogo from '../../assets/WhiteLogo.svg'
import ProfDefault from '../../assets/profdefault.png'
import { WhiteLogo } from './WhiteLogo'
import { UserContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { LinkService } from '../../frontServices/LinkService'
import { Utils } from '../../frontServices/Utils'
import { getCurrentUser } from '../../api/axios'
import { UserDto } from '../../types/user'

export const NavBar = () => {
    let { user } = useContext(UserContext)
    const [u, setU] = useState<UserDto | undefined | null>(user)
    let firstName = u?.firstName;
    let lastName = u?.lastName;
    const navigate = useNavigate()

    useEffect(() => {
        if (!u) {
            const getUser = async () => {
                const ur = await getCurrentUser();
                if (ur) {
                    setU(ur)
                    Utils.setUser(ur)
                }
            }
            getUser();
        }
    }, [])


    return (
        <div className='navBar flex between'>
            <div>
                <div className="flex between">
                    <WhiteLogo></WhiteLogo>
                </div>
            </div>
            <div className="profArea centerV flex">
                {u && <>
                    <h4 onClick={() => navigate(LinkService.getInstance().profile.base)} className='sm-d-none' >{u.firstName} {u.lastName}</h4>
                    <img onClick={() => navigate(LinkService.getInstance().profile.base)} src={ProfDefault} alt="profile-image" className='profile-image' />
                </>}
                {!u && <>
                    <h4 className='sm-d-none' >name will goes here</h4>
                    <img src={ProfDefault} alt="profile-image" className='profile-image' /></>}



            </div>
        </div>


    )
}
