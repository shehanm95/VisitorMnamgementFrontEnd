import React from 'react'
import { Visit } from '../../types/visit'

export const DisplayVisitList = ({ filteredVisits }: { filteredVisits: Visit[] }) => {
    return (
        <div className="visit-table-container">
            <table className="visit-table">
                <thead className="visit-table-header">
                    <tr>
                        <th className="visit-table-header-cell">Visit ID</th>
                        <th className="visit-table-header-cell">Option</th>
                        <th className="visit-table-header-cell">Date</th>
                        <th className="visit-table-header-cell">Start Time</th>
                        <th className="visit-table-header-cell">End Time</th>
                        <th className="visit-table-header-cell">Status</th>
                        <th className="visit-table-header-cell">Notes</th>
                        <th className="visit-table-header-cell">Printed</th>
                    </tr>
                </thead>
                <tbody className="visit-table-body">
                    {filteredVisits.map(v => (
                        <tr key={v.id} className="visit-table-row">
                            <td className="visit-table-cell">V{v.id}</td>
                            <td className="visit-table-cell">{v.visitOption?.visitOptionName || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.date || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.startTime || '-'}</td>
                            <td className="visit-table-cell">{v.visitRow?.endTime || '-'}</td>
                            <td className="visit-table-cell">{/* Status will go here */}</td>
                            <td className="visit-table-cell">{/* Notes will go here */}</td>
                            <td className="visit-table-cell">
                                <span className={`visit-table-status ${v.isPrinted ? 'printed' : 'not-printed'}`}>
                                    {v.isPrinted ? 'Yes' : 'No'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
