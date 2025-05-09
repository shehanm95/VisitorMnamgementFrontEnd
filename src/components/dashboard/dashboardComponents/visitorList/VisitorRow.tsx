import React from 'react';
import { UserDto } from '../../../../types/user';

interface VisitorRowProps {
    user: UserDto;
    onEditUser: (user: UserDto) => void;
}

export const VisitorRow: React.FC<VisitorRowProps> = ({ user, onEditUser }) => {
    return (
        <tr className="border-b">
            <td className="py-2 px-4">
                <div className="proImg flex center">

                    <img src={`${user.imagePath}`} alt="" />
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
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                    Edit User
                </button>
            </td>
        </tr>
    );
};
