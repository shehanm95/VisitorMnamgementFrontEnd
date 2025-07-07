import React from 'react'
import { NavBarContainer } from '../common/NavBarContainer'
import { Outlet } from 'react-router-dom'
import { VisitProvider } from '../../context/preRegContext'

export const PreReg = () => {
    return (
        <>
            <NavBarContainer>
                <h1 className='text-center'>Pre Registration</h1>
                <VisitProvider>
                    <Outlet>
                    </Outlet>
                </VisitProvider>
            </NavBarContainer>
        </>
    )
}
