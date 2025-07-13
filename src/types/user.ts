import { Duty } from "./Duty";

export interface UserDto {
    isPhoneNumberVerified: boolean,
    isEmailVerified: boolean,
    id: number | null,
    firstName: string,
    lastName: string,
    imagePath: string | null,
    email: string;
    phoneNumber: string,
    role: string,
    duties: Duty[],
}