import React from 'react'
import { UserDto } from '../../types/user'
import { Utils } from '../../frontServices/Utils'

export const useFullNameHook = () => {

    const getFullName = (user: UserDto) => {
        return `${Utils.toTitleCase(user.firstName)} ${Utils.toTitleCase(user.lastName)}`;
    }
    return (
        { getFullName }
    )
}
