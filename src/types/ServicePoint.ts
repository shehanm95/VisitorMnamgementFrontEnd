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
    officers: UserDto[];
    visits: Visit[];
    servicePointStatus: ServicePointStatus;
    officerQuestions: DynamicQuestion[];
    specialNotes: SpecialNote[];
}