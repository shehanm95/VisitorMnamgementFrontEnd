import React, { useContext, useEffect, useState } from 'react'
import { VisitType } from '../../types/visitType'
import { VisitTypeService } from '../../services/visitTypeSerive'
import { PreRegTypeCard } from './subPreReg/PreRegTypeCard'
import '../../components/frontOfficePage/css/displayVisitTypes.css'
import { useVisit } from '../../context/preRegContext'
import { getCurrentUser } from '../../api/axios'


export const PreRegTypes = () => {
    const [types, setTypes] = useState<VisitType[]>([])
    const { visit, setVisit } = useVisit()

    useEffect(() => {
        const getPreRegVisits = async () => {
            const ts = await VisitTypeService.getAllVisitTypes()
            if (ts)
                setTypes(ts);
        }

        const setVisitor = async () => {
            const v = await getCurrentUser()
            setVisit({ ...visit, visitor: v })
            console.log("visit ", visit)
        }
        setVisitor()

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
