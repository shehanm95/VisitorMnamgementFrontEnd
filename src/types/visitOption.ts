import { DynamicQuestion } from "./dynamicQuestion";
import { VisitType } from "./visitType";

export interface VisitOption {
    id?: number;
    visitOptionName: string;
    visitType: VisitType | null;
    description?: string;
    isPreRegistration: boolean;
    imageName?: string;
    isPhotoRequired: boolean;
    isPhotoOptional: boolean;
    isPhoneNumberRequired: boolean;
    isEmailRequired: boolean;
    dynamicQuestions: DynamicQuestion[];
}