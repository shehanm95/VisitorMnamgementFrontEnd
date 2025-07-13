import { AnswerType } from "./AnswerType";
import { Gate } from "./Gate";
import { UserDto } from "./user";
import { VisitOption } from "./visitOption";
import { VisitRow } from "./VisitRow";

export interface Visit {
    id?: number;
    visitOption: VisitOption;
    visitor: UserDto;
    imageName?: string;
    badgePrintDate?: Date;
    dynamicAnswers: AnswerType[];
    visitRow: VisitRow;
    isPrinted: boolean;
    enteredGate: Gate;
    exitGate: Gate;
    exitTime: string;
}