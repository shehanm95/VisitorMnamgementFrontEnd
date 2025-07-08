import { getCurrentUser } from "../api/axios";
import { UserDto } from "../types/user";

let ur: UserDto | undefined | null = undefined;

export const Utils = {


    toTitleCase: (str: string) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    setUser: (user: UserDto | null | undefined) => {

        ur = user;
    },
    getUser: (): UserDto | undefined | null => {
        return ur;
    }




}