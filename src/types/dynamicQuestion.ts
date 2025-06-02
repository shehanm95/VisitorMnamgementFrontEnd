import { ButtonAnswer } from "./buttonAnswer";
import { VisitOption } from "./visitOption";

export interface DynamicQuestion {
    id?: number;
    visitOption: VisitOption | undefined;
    questionText: string;
    specialInstructions?: string;
    isRequired: boolean;
    answerType: 'button' | 'number' | 'text';
    buttonAnswers?: ButtonAnswer[];
    isActive: boolean;
    canSelectMoreThanOne: boolean;
}