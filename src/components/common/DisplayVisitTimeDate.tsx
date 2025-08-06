import React from 'react'
import { VisitRow } from '../../types/VisitRow'

export const DisplayVisitTimeDate = ({ visitRow }: { visitRow: VisitRow }) => {
    return (
        <div>
            <hr />
            {visitRow.date && <>
                <h3 className='m-3'>Visit Date :</h3>
                <h4 className='m-3'>{visitRow.date}</h4></>}


            {visitRow.startTime && visitRow.endTime &&
                <>
                    <h3 className='m-3'>Visit Time :</h3>
                    <h4 className='m-3'>{visitRow.startTime} - {visitRow.endTime}</h4></>}
        </div>
    )
}
