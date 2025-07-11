import React, { useEffect, useState } from 'react'
import { UserDto } from '../../../types/user'
import Header from '../../common/Header'
import PersonImage from '../../frontOfficePage/frontComp/profileImage.avif'
import './profileDetails.css'

export const ProfileDetails = ({ user }: { user: UserDto }) => {
    const [imagePath, setImagePahth] = useState<string>(PersonImage)

    useEffect(() => {
        const getPersonImage = async () => {
            // const img = await userService.getUserImage();
            // setImagePahth(URL.createObjectURL(img));
        }
        getPersonImage();
    }, [imagePath])


    return (
        <div className='prof-outer'>

            <Header title={'Profile Informations'} tooltipText={'this will show the users informations'}></Header>
            <div className="prof-imageAndDetails">
                <div className="prof-img">
                    <img src={imagePath} alt={`user image - ${user.firstName + " " + user.lastName}`} />
                    <div className="prof-verifiedIcon">
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="prof-details">

                    <div className="prof-details-slot">
                        <div className="prof-detail-title">Name</div>
                        <div className="prof-detail-value-slot">
                            <div className='prof-details-values-n-buttons'>
                                <div className="prof-detail-value">
                                    {`${user.firstName + " " + user.lastName}`}
                                </div>
                                <div className="prof-details-buttons">
                                    <button className='prof-button'>Change Name</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="prof-details-slot">
                        <div className="prof-detail-title">Email</div>
                        <div className="prof-detail-value-slot">
                            <div className='prof-details-values-n-buttons'>
                                <div className="prof-detail-value">
                                    {`${user.email}`}
                                </div>
                                <div className="prof-details-buttons">
                                    <button className='prof-button'>Send Email</button>
                                    <button className='prof-button'>Verifiy Email</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="prof-details-slot">
                        <div className="prof-detail-title">Phone Number</div>
                        <div className="prof-detail-value-slot">
                            {user.phoneNumber ?
                                <div className='prof-details-values-n-buttons'>
                                    <div className="prof-detail-value">
                                        {`${user.phoneNumber}`}
                                    </div>
                                    <div className="prof-details-buttons">
                                        <button className='prof-button'>Send Email</button>
                                        <button className='prof-button'>Verifiy Email</button>
                                    </div>
                                </div>
                                :
                                <div className='prof-details-values-n-buttons'>

                                    <div className="prof-details-buttons">
                                        <button className='prof-button'>Add Phone Number</button>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
