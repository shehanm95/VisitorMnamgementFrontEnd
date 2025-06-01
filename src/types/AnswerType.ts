import { ButtonAnswer } from "./buttonAnswer";
import { DynamicQuestion } from "./dynamicQuestion";



export interface AnswerType {
    questionId: number;
    dynamicQuestion: DynamicQuestion // answer is mapp to this, other wise I cannot find the question
    answerType: 'number' | 'text' | 'button';
    value?: string | number;
    selectedButtonAnswers?: ButtonAnswer[];
}
