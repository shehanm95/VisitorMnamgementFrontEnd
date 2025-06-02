import { ButtonAnswer } from "./buttonAnswer";
import { DynamicQuestion } from "./dynamicQuestion";



export interface AnswerType {
    questionId: number;
    dynamicQuestion: DynamicQuestion
    answerType: 'number' | 'text' | 'button';
    value?: string | number;
    selectedButtonAnswers?: ButtonAnswer[];
}
