import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Visit } from '../../types/visit';
import { VisitService } from '../../services/visitService';
import { NavBarContainer } from './NavBarContainer';
import './css/fullVisit.css'
import { ProfileDetails } from '../profile/subProf/ProfileDetails';
import { ShowOptionDetails } from '../preReg/subPreReg/ShowOptionDetails';
import { FullServicePoint } from './FullServicePoint';
import { PointFrontService } from '../../frontServices/PointFrontService';
import { DisplayVisitTimeDate } from './DisplayVisitTimeDate';

export const CheckFullVisit = () => {
    const { id } = useParams<{ id: string }>();
    const [visit, setVisit] = useState<Visit>()
    //const { navigate, links } = useMyNavigator()

    useEffect(() => {
        const fetchVisit = async () => {
            try {
                const v = await VisitService.getVisitById(parseInt(id!))
                console.log("fetched visit", v)
                if (v) {
                    const av = PointFrontService.getFullyAnswerSetupVisit(v)
                    console.log("full visit", av)
                    setVisit(av);
                }
            } catch (e) {
                console.error("error fetching in full visit display", e);
                // navigate(links.preReg.base)
            }
        }
        fetchVisit();
    }, [])

    return (
        <NavBarContainer>
            <div className="full-container">
                <ProfileDetails user={visit?.visitor!}></ProfileDetails>
                <ShowOptionDetails visitOption={visit?.visitOption!}></ShowOptionDetails>

                {visit?.visitRow && <DisplayVisitTimeDate visitRow={visit?.visitRow!} visitId={visit.id!} />}
                <hr />

                {visit?.visitOption.servicePoints && visit.visitOption.servicePoints?.map((servicePoint) =>
                    <FullServicePoint key={servicePoint.id} servicePoint={servicePoint}></FullServicePoint>)}


                {/* <div>{visit && JSON.stringify(visit)}</div> */}
            </div>
        </NavBarContainer>
    )

}
