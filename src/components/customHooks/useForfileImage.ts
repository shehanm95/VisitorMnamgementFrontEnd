import React, { useEffect, useState } from 'react'
import { UserDto } from '../../types/user'
import ProfImage from '../../assets/ProfDefault.avif'
import userService from '../../services/userService';

export const useForfileImageSetter = ({ user }: { user: UserDto }) => {
    const [profileImage, setProfileImage] = useState<string>(ProfImage);

    useEffect(() => {
        if (user.imagePath) {
            const getProfileImage = async () => {
                try {
                    const response = await userService.getImage(user.imagePath!);
                    if (response) {
                        setProfileImage(URL.createObjectURL(response));
                    }
                } catch (error) {
                    console.error("Error fetching " + user.firstName + " profile image:", error);
                }
            }
            getProfileImage();
        }
    }, []);
    return (
        {
            profileImage
        }
    )
}
