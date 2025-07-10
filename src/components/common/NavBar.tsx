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
import { FrontLoginButton } from '../frontOfficePage/frontComp/FrontLoginButton'


export const NavBar = () => {
    let { user } = useContext(UserContext)
    const [u, setU] = useState<UserDto | undefined | null>(user)
    const links = LinkService.getInstance();
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
            <div className="profArea centerV flex p-3">
                {u && <>
                    <h4 onClick={() => navigate(links.profile.base)} className='sm-d-none' >{Utils.toTitleCase(u.firstName)} {Utils.toTitleCase(u.lastName)}</h4>
                    <img onClick={() => navigate(links.profile.base)} src={ProfDefault} alt="profile-image" className='profile-image' />
                </>}
                {!u && <>
                    <button className='navbarLoginButton' onClick={() => navigate(links.login)}>Login</button>
                    <img onClick={() => navigate(links.login)} src={ProfDefault} alt="profile-image" className='profile-image' />
                </>}



            </div>
        </div>


    )
}
