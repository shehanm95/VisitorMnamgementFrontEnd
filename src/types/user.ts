export interface UserDto {
    id: number | null;
    firstName: string;
    lastName: string;
    imagePath: string | null;
    email: string;
    role: string;
}