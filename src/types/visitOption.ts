import { VisitType } from "./visitType";

export interface VisitOption {
    id?: number;
    visitOptionName: string;
    visitType: VisitType;
    description?: string;
    isPreRegistration: boolean;
    imageName?: string;
    isPhotoRequired: boolean;
    isPhotoOptional: boolean;
    isPhoneNumberRequired: boolean;
    isEmailRequired: boolean;
}