import { off } from "process";
import { Duty } from "../types/Duty";
import { DynamicQuestion } from "../types/dynamicQuestion";
import { ServicePoint } from "../types/ServicePoint";
import { UserDto } from "../types/user";
import { Visit } from "../types/visit";


export const PointFrontService = {
    fetchServicePointsByOfficer: (visit: Visit, officer: UserDto): ServicePoint[] => {
        const officerId: number = officer.id!;
        const allServicePoints: ServicePoint[] = visit.visitOption.servicePoints!;

        const relatedServicePoints: ServicePoint[] = allServicePoints.filter((s: ServicePoint) => {
            return s.duties.some((d: Duty) => {
                return d.officer.id === officerId;
            });
        });

        return relatedServicePoints;
    },

    getOfficerQuestionswithAnsweredReferences: (visit: Visit, servicePoint: ServicePoint): DynamicQuestion[] => {
        const answers = visit.dynamicAnswers || [];
        const officerQuestions = servicePoint.officerQuestions || [];
        for (const question of officerQuestions) {
            for (const referenceQuestion of question.referenceQuestions || []) {
                const answer = answers.find(a => a.dynamicQuestion.id === referenceQuestion.id);
                if (answer) {
                    referenceQuestion.answer = answer;
                } else {
                    referenceQuestion.answer = undefined; // Ensure answer is defined
                }
            }
        }
        return officerQuestions;
    }
};