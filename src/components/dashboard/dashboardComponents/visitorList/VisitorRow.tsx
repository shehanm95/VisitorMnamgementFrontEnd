import React from 'react';
import { UserDto } from '../../../../types/UserDto';
import { PersonCircle } from '../servicePointComps/PersonCircle';
import { useMyNavigator } from '../../../customHooks/useMyNavigator';
import userService from '../../../../services/userService';

interface VisitorRowProps {
    user: UserDto;
    onEditUser: (user: UserDto) => void;
    removeFromList: (id: number) => void
}

export const VisitorRow: React.FC<VisitorRowProps> = ({ user, onEditUser, removeFromList }) => {
    function deleteUser(id: number): void {
        const deleteU = async () => {
            const response = await userService.deleteUser(id);
            if (response) {
                removeFromList(id)
                console.log("user deleted")
            }
            ;
        }
        deleteU()
    }

    return (
        <tr className="border-b">
            <td className="py-2 px-4">
                <div className="proImg flex center">
                    <PersonCircle user={user}></PersonCircle>
                    {/* <img src={`${user.imagePath}`} alt="" /> */}
                </div>
            </td>

            <td className="py-2 px-4">{`${user.firstName} ${user.lastName}`}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">-</td>
            <td className="py-2 px-4">-</td>
            <td className="py-2 px-4">-</td>
            <td className="py-2 px-4">{user.role}</td>
            <td className="py-2 px-4">
                <button
                    onClick={() => onEditUser(user)}
                    className="outline_button"
                >
                    Edit User
                </button>
                <button
                    onClick={() => deleteUser(user.id!)}
                    className="outline_button ms-1"
                >
                    Delete User
                </button>
            </td>
        </tr>
    );
};
