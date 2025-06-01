import { VisitOption } from "../types/visitOption";

let currentVisitOption: VisitOption | null = null;

export const ModeratorService = {
    get currentVisitOption(): VisitOption | null {
        return currentVisitOption;
    },

    setCurrentVisitOption: (visitOption: VisitOption | null) => {
        currentVisitOption = visitOption;
        console.log("current visit Option set")
    },

    getCurrentVisitOption: (): VisitOption | null => {
        return currentVisitOption;
    },

    clearCurrentVisitOption: (): void => {
        currentVisitOption = null;
    }
};