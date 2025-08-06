import React, { useEffect, useState } from 'react'
import { ProfileDetails } from './subProf/ProfileDetails'
import { useNavigate, useParams } from 'react-router-dom';
import { UserDto } from '../../types/UserDto';
import userService from '../../services/userService';
import { LinkService } from '../../frontServices/LinkService';
import { NavBarContainer } from '../common/NavBarContainer';
import './checkProfile.css'
import { VisitService } from '../../services/visitService';
import { Visit } from '../../types/visit';
import { DisplayVisitList } from '../common/DisplayVisitList';


export const CheckVisitorProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = React.useState<UserDto | undefined>();
    const navigate = useNavigate();
    const links = LinkService.getInstance()
    const [visits, setVisits] = useState<Visit[]>([])

    useEffect(() => {
        console.log("Visitor ID from params: ", id);
        try {
            const userId = parseInt(id!);
            if (isNaN(userId)) {
                console.error("Invalid user ID:", id);
                return;
            }
            const fetchUser = async () => {
                const response = await userService.getUserById(userId);
                if (response) {
                    console.log(response)
                    setUser(response);
                } else {
                    console.error("User not found for ID:", userId);
                    navigate(links.servicePoint.scan);
                }
            }
            fetchUser();
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [id]);


    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const vs = await VisitService.getVisitsByVisitorUserId(parseInt(id!))
                setVisits(vs)
            } catch (e) {
                console.error("error in fetching visits by visitor", e)
            }
        }
        fetchVisits();
    }, [])
    return (
        <div>
            <NavBarContainer>
                <div className="check-container">
                    {user && <ProfileDetails user={user!}></ProfileDetails>}
                    {visits && <DisplayVisitList filteredVisits={visits} ></DisplayVisitList>}
                </div>
            </NavBarContainer>
        </div>
    )
}
