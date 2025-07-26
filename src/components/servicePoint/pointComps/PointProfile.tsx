import React from 'react'
import { UserDto } from '../../../types/user'
import { useForfileImageSetter } from '../../customHooks/useForfileImage';

export const PointProfile = ({ visitor }: { visitor: UserDto }) => {
    const { profileImage } = useForfileImageSetter({ user: visitor });
    const fullName = `${visitor.firstName} ${visitor.lastName}`;
    return (
        <div className="point-answering-prof-sec-outer">
            <div className="point-answering-profile-section">
                <img src={profileImage} alt="Profile" className="point-answering-profile-pic" />
                <div className="point-answering-profile-info">
                    <span className="point-answering-visitor-name">: {fullName}</span>
                    <button className="outline_button">View Full Profile</button>
                </div>
            </div>
        </div>
    )
}
