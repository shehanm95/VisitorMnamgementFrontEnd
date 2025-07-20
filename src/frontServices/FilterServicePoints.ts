import { Duty } from "../types/Duty";
import { ServicePoint } from "../types/ServicePoint";
import { UserDto } from "../types/user";
import { Visit } from "../types/visit";


export const PointFrontService = {
    filter: (visit: Visit, officer: UserDto): ServicePoint[] => {
        const officerId: number = officer.id!;
        const allServicePoints: ServicePoint[] = visit.visitOption.servicePoints!;

        const relatedServicePoints: ServicePoint[] = allServicePoints.filter((s: ServicePoint) => {
            return s.duties.some((d: Duty) => {
                return d.officer.id === officerId;
            });
        });

        return relatedServicePoints;
    },

    filterQuestions: (visit: Visit, servicePoint: ServicePoint) => {
        // Returns the officerQuestions for the given servicePoint
        return servicePoint.officerQuestions || [];
    }
};