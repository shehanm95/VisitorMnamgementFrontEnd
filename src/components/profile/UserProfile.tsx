import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkService } from '../../frontServices/LinkService'
import userService from '../../services/userService'
import { getCurrentUser, logout } from '../../api/axios'
import { UserDto } from '../../types/user'
import { Utils } from '../../frontServices/Utils'
import { ProfileDetails } from './subProf/ProfileDetails'
import './profile.css'
import { NavBarContainer } from '../common/NavBarContainer'
import { RightAlign } from '../common/RightAlign'
import { VisitService } from '../../services/visitService'
import { Visit } from '../../types/visit'
import './visitTable.css'

export const UserProfile = () => {
    const navigate = useNavigate()
    const links = LinkService.getInstance()
    const [user, setUser] = useState<UserDto | undefined | null>(Utils.getUser);
    const [visits, setVisits] = useState<Visit[]>([])
    const [filteredVisits, setFilteredVisits] = useState<Visit[]>([])
    const [loadingVisits, setLoadingVisits] = useState(true)
    const [activeFilter, setActiveFilter] = useState<'all' | 'future' | 'past'>('all')

    const goToDashboard = () => {
        console.log(user)
        if (user?.role === 'ROLE_MODERATOR') { navigate(links.moderatorDashboard.base) }
        else if (user?.role === 'ROLE_ADMIN') { navigate(links.moderatorDashboard.base) }
        else if (user?.role === 'ROLE_VISITOR') { navigate(links.visitorDashboard) }
        else {
            alert("role not identified")
        }
    }

    useEffect(() => {
        const getVisits = async () => {
            try {
                setLoadingVisits(true)
                const visits = await VisitService.getVisitsByVisitorUserId(user?.id!)
                setVisits(visits);
                setFilteredVisits(visits);
                console.log("fetched visits: ", visits)
            } catch (error) {
                console.error("Error fetching visits:", error)
            } finally {
                setLoadingVisits(false)
            }
        }
        getVisits();
    }, [user?.id])

    const filterVisits = (filterType: 'all' | 'future' | 'past') => {
        setActiveFilter(filterType)

        if (filterType === 'all') {
            setFilteredVisits(visits)
            return
        }

        const currentDate = new Date()
        setFilteredVisits(visits.filter(visit => {
            if (!visit.visitRow?.date) return false

            const visitDate = new Date(visit.visitRow.date)
            return filterType === 'future'
                ? visitDate >= currentDate
                : visitDate < currentDate
        }))
    }

    return (
        <NavBarContainer >
            <div className='prof-container'>
                <h2 className='mt-5 mb-3'>User Profile</h2>

                {user && <ProfileDetails user={user}></ProfileDetails>}

                <RightAlign>
                    <button onClick={goToDashboard} className='front-Button'>Dashboard </button>
                    <button onClick={() => navigate(links.preReg.base)} className='front-Button'>Home </button>
                    <button onClick={logout} className='front-Button'>Logout</button>
                </RightAlign>

                <hr></hr>
                <h2>Your Visits</h2>

                <div className='prof-filters'>
                    <h4
                        className={`prof-filter-item ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => filterVisits('all')}
                    >
                        All
                    </h4>
                    <span className="prof-filter-divider">|</span>
                    <h4
                        className={`prof-filter-item ${activeFilter === 'future' ? 'active' : ''}`}
                        onClick={() => filterVisits('future')}
                    >
                        Future
                    </h4>
                    <span className="prof-filter-divider">|</span>
                    <h4
                        className={`prof-filter-item ${activeFilter === 'past' ? 'active' : ''}`}
                        onClick={() => filterVisits('past')}
                    >
                        Past
                    </h4>
                </div>

                {

                    loadingVisits ? (
                        <div>Loading visits...</div>
                    ) :


                        filteredVisits.length > 0 ? (
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
                        ) : (
                            <div className='m-5'>
                                <h2 className='m-5'>
                                    {activeFilter === 'all'
                                        ? 'You do not have any visits yet'
                                        : `No ${activeFilter} visits found`}
                                </h2>
                            </div>
                        )



                }
            </div>
        </NavBarContainer>
    )
}