import './css/displayVisitTypes.css'
import { useState } from 'react'
import { SideBarBlurBack } from '../common/SideBarBlurBack'
import { FrontSideBar } from './frontComp/FrontSideBar'
import { WhiteLogo } from '../common/WhiteLogo'
import { DateTimeLoc } from './frontComp/DateTimeLoc'
import { TouchFreeSign } from './frontComp/TouchFreeSign'
import { VisitCardContainer } from './frontComp/VisitCardContainer'

export const DisplayVisitTypes = () => {
    const [isSideBarOn, setSideBarOn] = useState(false)


    function sideBarToggle(): void {
        setSideBarOn(prev => !prev)
    }

    return (

        <div className='frontPage'>
            <div className="topBar">
                <div onClick={() => sideBarToggle()} className="backButton mainBack"> <i className="fa fa-arrow-left"></i></div>
                <div className='flex column centerV pb-2'>
                    <h1>Wellcome</h1>
                    <h2>Select Your Visit Type</h2>
                    <h3>You are Going To Enter From Gate A</h3>
                </div>

            </div>
            <div className="front-content">
                <VisitCardContainer></VisitCardContainer>
            </div>
            <div className="footer">
                <div className="footerbox">
                    <TouchFreeSign></TouchFreeSign>
                </div>
                <div className="footerbox middle">
                    <DateTimeLoc></DateTimeLoc>
                </div>
                <div className="footerbox">
                    <WhiteLogo></WhiteLogo>
                </div>
            </div>

            {isSideBarOn && <SideBarBlurBack closeSideBar={sideBarToggle} >
                <FrontSideBar close={sideBarToggle}></FrontSideBar>
            </SideBarBlurBack>}

        </div>
    )
}
