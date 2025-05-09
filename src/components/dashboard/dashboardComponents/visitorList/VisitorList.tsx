import { useState, useEffect } from "react";
import { UserDto } from "../../../../types/user";
import userService from "../../../../services/userService";
import { VisitorRow } from "./VisitorRow";
import { EditUserWindow } from "./EditUserWindow";
import { BlurBack } from "../../../common/BlurBack";

const VisitorList: React.FC = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load users');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEditUser = (user: UserDto) => {
        setSelectedUser(user);
        setShowEditWindow(true);
    };

    const handleUserSave = (updatedUser: UserDto) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
        setShowEditWindow(false);
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    return (
        <div className="visitor-list p-4">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Picture</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Phone Number</th>
                        <th className="py-2 px-4 text-left">Times Visited</th>
                        <th className="py-2 px-4 text-left">No of Notes</th>
                        <th className="py-2 px-4 text-left">Role</th>
                        <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <VisitorRow key={user.id} user={user} onEditUser={handleEditUser} />
                    ))}
                </tbody>
            </table>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Load next 50 visitors
            </button>
            {showEditWindow && selectedUser && (
                <BlurBack>
                    <EditUserWindow
                        user={selectedUser}
                        onClose={() => setShowEditWindow(false)}
                        onSave={handleUserSave}
                    />
                </BlurBack>
            )}
        </div>
    );
};

export default VisitorList;
