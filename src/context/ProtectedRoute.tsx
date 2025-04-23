import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './ContextProvider';

// Define the shape of the context value (for reference, assuming from ContextProvider)
interface UserContextType {
    role: string;
    authenticated: boolean;
}

// Define props for ProtectedRoute
interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const { role } = useContext(UserContext);
    console.log("protected roles : " + role);

    if (!roles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;