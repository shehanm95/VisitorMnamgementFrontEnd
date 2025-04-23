import { createContext, ReactNode } from 'react';
import { getRole } from '../api/axios';

// Define the shape of the context value
interface UserContextType {
    role: string;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
    role: 'GUEST',
});

// Define props for the provider component
interface ContextProviderProps {
    children: ReactNode;
}

// Create the provider component
const ContextProvider = ({ children }: ContextProviderProps) => {
    const role = getRole() || "GUEST";
    console.log("got role : " + role)

    return (
        <UserContext.Provider value={{ role }}>
            {children}
        </UserContext.Provider>
    );
};

export default ContextProvider;