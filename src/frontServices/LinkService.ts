export class LinkService {
    private static instance: LinkService | null = null;

    // Public readonly properties for all routes
    public readonly login: string = "/login";
    public readonly register: string = "/register";
    public readonly home: string = "/homea"; // Note: Consider renaming to "/home" for clarity
    public readonly unauthorized: string = "/unauthorized";
    public readonly root: string = "/";
    public readonly test: string = "/test";
    public readonly frontOffice: {
        thankyouAndInstructions: string;
        showVisitDetails: string;
        takePhoto: string;
        answerQuestions: string;
        verifyEmail: string;
        forgotPass: string;
        login: string;
        register: string;
        visitTypes: string;
        visitOptions: string;
    } = {
            visitTypes: "/frontOffice/visitTypes",
            visitOptions: "/frontOffice/visitOptions",
            register: "/frontOffice/reigster",
            login: "/frontOffice/login",
            forgotPass: "/frontOffice/forgotpass",
            verifyEmail: "/frontOffice/verifyEmail",
            answerQuestions: "/frontOffice/answerQuestions",
            takePhoto: "/frontOffice/takePhoto",
            showVisitDetails: "/frontOffice/showVisitDetails",
            thankyouAndInstructions: "/frontOffice/thankyou"
        };
    public readonly user: string = "/user";
    public readonly visitorDashboard: string = "/visitorDashboard";
    public readonly moderatorDashboard: {
        addDynamicQuestion: string;
        base: string;
        visitOptions: string;
        goToOptions: string;
        createVisitOption: string;
        allVisitors: string;
    } = {
            base: "/moderatorDashboard",
            visitOptions: "/moderatorDashboard/visitOptions",
            goToOptions: "/moderatorDashboard/goToOptions",
            createVisitOption: "/moderatorDashboard/visitOptions/create",
            allVisitors: "/moderatorDashboard/allvisitors",
            addDynamicQuestion: "/moderatorDashboard/dynamicQ"
        };
    public readonly officerDashboard: string = "/officerDashboard";

    public readonly preReg: {
        setRow: string;
        base: string;
        questions: string;
        preRegOptions: string;
        types: string
    } = {
            base: "/preReg/",
            types: "/preReg/types",
            preRegOptions: "/preReg/options",
            questions: "/preReg/questions",
            setRow: "/preReg/setVisitRow"
        };
    profile: {
        base: string
    } = {
            base: '/profile'
        };


    // Private constructor to prevent direct instantiation
    private constructor() { }

    // Get singleton instance
    public static getInstance(): LinkService {
        if (!LinkService.instance) {
            LinkService.instance = new LinkService();
        }
        return LinkService.instance;
    }
}