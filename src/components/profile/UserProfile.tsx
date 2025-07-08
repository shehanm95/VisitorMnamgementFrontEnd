import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkService } from '../../frontServices/LinkService'
import userService from '../../services/userService'
import { getCurrentUser } from '../../api/axios'
import { UserDto } from '../../types/user'
import { Utils } from '../../frontServices/Utils'

export const UserProfile = () => {
    const navigate = useNavigate()
    const links = LinkService.getInstance()
    const [user, setUser] = useState<UserDto | undefined | null>(Utils.getUser);


    const goToDashboard = () => {
        console.log(user)
        if (user?.role === 'ROLE_MODERATOR') { navigate(links.moderatorDashboard.base) }
        else if (user?.role === 'ROLE_ADMIN') { navigate(links.moderatorDashboard.base) }
        else if (user?.role === 'ROLE_VISITOR') { navigate(links.visitorDashboard) }
        else {
            alert("role not identified")
        }
    }

    return (
        <div> <h1>This is User Profile</h1>
            {user ? <>

                <p>{user.firstName} {user.lastName}</p>
            </> :
                <p>no user available</p>
            }
            <button onClick={goToDashboard} className='front-Button'>Dashboard </button>
            <button onClick={() => navigate(links.preReg.base)} className='front-Button'>Home </button>

        </div>
    )
}
