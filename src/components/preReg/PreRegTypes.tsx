import React, { useContext, useEffect, useState } from 'react'
import { VisitType } from '../../types/visitType'
import { VisitTypeService } from '../../services/visitTypeSerive'
import { PreRegTypeCard } from './subPreReg/PreRegTypeCard'
import '../../components/frontOfficePage/css/displayVisitTypes.css'

export const PreRegTypes = () => {
    const [types, setTypes] = useState<VisitType[]>([])

    useEffect(() => {
        const getPreRegVisits = async () => {
            const ts = await VisitTypeService.getAllVisitTypes()
            setTypes(ts);
        }
        getPreRegVisits();
    }, [])
    return (
        <div className="front-content">
            {types ? types.map((type) =>
                <PreRegTypeCard key={type.id} vType={type}></PreRegTypeCard>
            ) : <p>No Visit Types To Show....</p>}

        </div>
    )
}
