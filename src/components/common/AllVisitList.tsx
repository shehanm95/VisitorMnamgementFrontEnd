import React from 'react'
import './css/allVisitList.css'
import { Visit } from '../../types/visit';
import { useFullNameHook } from '../customHooks/useFullNameHook';
import { PersonCircle } from '../dashboard/dashboardComponents/servicePointComps/PersonCircle';
import { useMyNavigator } from '../customHooks/useMyNavigator';

export const AllVisitList = ({ visits }: { visits: Visit[] }) => {
    const { getFullName } = useFullNameHook()
    const { links, navigate } = useMyNavigator()
    return (
        <div className="visit-table-container">
            <table className="visit-table">
                <thead className="visit-table-header">
                    <tr >
                        <th className="visit-table-header-cell">Visit ID</th>
                        <th className="visit-table-header-cell">Option</th>
                        <th className="visit-table-header-cell">visitor Prof</th>
                        <th className="visit-table-header-cell">visitor</th>
                        <th className="visit-table-header-cell">Date</th>
                        <th className="visit-table-header-cell">Start Time</th>
                        <th className="visit-table-header-cell">End Time</th>
                        <th className="visit-table-header-cell">Status</th>
                        <th className="visit-table-header-cell">Notes</th>
                        <th className="visit-table-header-cell">Printed</th>
                    </tr>
                </thead>
                <tbody className="visit-table-body">
                    {visits.map(v => (
                        <tr key={v.id} onClick={() => navigate(links.visit.fullVisitMethod(v.id!))} className="visit-table-row">
                            <td className="visit-table-cell">V{v.id}</td>
                            <td className="visit-table-cell">{v.visitOption?.visitOptionName || '-'}</td>
                            <td className="visit-table-cell"><PersonCircle user={v.visitor}></PersonCircle></td>
                            <td className="visit-table-cell">{getFullName(v.visitor) || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.date || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.startTime || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.endTime || '-'}</td>
                            <td className="visit-table-cell">{/* Status will go here */}</td>
                            <td className="visit-table-cell">{/* Notes will go here */}</td>
                            <td className="visit-table-cell">
                                <span className={`visit-table-status ${v.printed ? 'printed' : 'not-printed'}`}>
                                    {v.printed ? 'Yes' : 'No'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
