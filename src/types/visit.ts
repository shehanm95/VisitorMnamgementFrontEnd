import { AnswerType } from "./AnswerType";

export interface Visit {
    id?: number;
    visitOptionId: number;
    visitorUserId: number;
    imageName?: string;
    badgePrintDate?: Date;
    dynamicAnswers: AnswerType[];
}