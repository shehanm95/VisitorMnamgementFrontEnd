import { Duty } from "./Duty";
import { DynamicQuestion } from "./dynamicQuestion";
import { ServicePointStatus } from "./ServicePointStatus";
import { SpecialNote } from "./SpecialNote";
import { UserDto } from "./user";
import { Visit } from "./visit";
import { VisitOption } from "./visitOption";

export interface ServicePoint {
    id: number;
    pointName: string;
    pointDescription: string;
    officerInstructions: string;
    visitorInstructions: string;
    visitOption: VisitOption;
    duties: Duty[];
    visits: Visit[];
    servicePointStatus: ServicePointStatus;
    officerQuestions: DynamicQuestion[];
    specialNotes: SpecialNote[]; // no need to set them here
    isFrontOffice: boolean;
    isHost: boolean;
}