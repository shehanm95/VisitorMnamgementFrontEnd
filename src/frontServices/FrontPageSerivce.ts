import { UserDto } from "../types/user";
import { VisitOption } from "../types/visitOption";
import { VisitType } from "../types/visitType";

export class FrontPageService {
    private static instance: FrontPageService | null = null;
    private selectedVisitType: VisitType | null = null;
    private selectedVisitOption: VisitOption | null = null;
    private currentVisitor: UserDto | null = null;

    private constructor() { } // Private constructor to prevent direct instantiation

    // Get singleton instance
    public static getInstance(): FrontPageService {
        if (!FrontPageService.instance) {
            FrontPageService.instance = new FrontPageService();
        }
        return FrontPageService.instance;
    }

    public setSelectedVisitType(visitType: VisitType): void {
        this.selectedVisitType = visitType;
    }

    public getSelectedVisitType(): VisitType | null {
        return this.selectedVisitType;
    }

    public setSelectedVisitOption(visitOption: VisitOption): void {
        console.log(visitOption)
        this.selectedVisitOption = visitOption;
    }

    public getSelectedVisitOption(): VisitOption | null {
        return this.selectedVisitOption;
    }

    public clearFrontEndService(): void {
        this.selectedVisitType = null;
        this.selectedVisitOption = null;
        this.currentVisitor = null;
    }

    public setCurrectVisitor(visitor: UserDto) {
        this.currentVisitor = visitor;
    }
    public getCurrectVisitor() {
        return this.currentVisitor;
    }

}