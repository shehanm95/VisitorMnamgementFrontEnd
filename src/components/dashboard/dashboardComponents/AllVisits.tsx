import React, { useEffect, useState } from 'react'
import { UserDto } from '../../../types/UserDto';
import { VisitService } from '../../../services/visitService';
import { Visit } from '../../../types/visit';
import { AllVisitList } from '../../common/AllVisitList';
import { Center } from '../../common/Center';

export const AllVisits = () => {
    const [allVisits, setAllVisits] = useState<Visit[]>([]);

    useEffect(() => {
        const getAllVisits = async () => {
            try {
                const visits = await VisitService.getAllVisits();
                console.log("Fetched all visits: ", visits);
                setAllVisits(visits);
            } catch (error) {
                console.error("Error fetching all visits:", error);
            }

        }
        getAllVisits();
    }, [])
    return (
        <div>
            {allVisits.length > 0 ? <AllVisitList visits={allVisits}></AllVisitList> :
                <Center>
                    <h2>No Visits To Show</h2>
                </Center>


            }
        </div>
    )
}
