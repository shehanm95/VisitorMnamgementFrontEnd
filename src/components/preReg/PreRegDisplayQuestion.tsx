import { FrontPageService } from "../../frontServices/FrontPageSerivce";
import { LinkService } from "../../frontServices/LinkService";
import { DynamicQuestionService } from "../../services/DyanmicQuestionService";
import { RightAlign } from "../common/RightAlign";
import { useDynamicQuestions } from "../customHooks/useDynamicQuestions";


const PreRegDisplayQuestion: React.FC = () => {
    const frontservice = FrontPageService.getInstance();
    const linkService = LinkService.getInstance();

    const {
        answers,
        currentIndex,
        haveAnswer,
        fieldValue,
        currentQuestion,
        setFieldValue,
        handleInputChange,
        handleButtonClick,
        handleNext,
        questions
    } = useDynamicQuestions({
        getQuestions: async () => {
            const option = frontservice.getSelectedVisitOption();
            const id = option?.id || 0;
            return await DynamicQuestionService.getQuestionsByVisitOptionId(id);
        },
        completeNavigationLink: linkService.frontOffice.takePhoto,
        onComplete: (answers) => {
            frontservice.setCurrentDynamicAnswers(answers);
        }
    });

    if (!currentQuestion) return <div className="pre-reg-question__loading">Loading...</div>;

    return (
        <div className="pre-reg-question">
            <p className="pre-reg-question__progress">
                Question {currentIndex + 1} of {questions.length}
            </p>
            <h2 className="pre-reg-question__title">{currentQuestion.questionText}</h2>

            {currentQuestion.answerType === 'text' && (
                <input
                    className="pre-reg-question__input"
                    value={fieldValue}
                    type="text"
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Type your answer here..."
                />
            )}

            {currentQuestion.answerType === 'number' && (
                <input
                    className="pre-reg-question__input"
                    type="number"
                    value={fieldValue}
                    onChange={(e) => handleInputChange(Number(e.target.value))}
                    placeholder="Enter a number..."
                />
            )}

            {currentQuestion.answerType === 'button' && (
                <div className="pre-reg-question__button-container">
                    {currentQuestion.buttonAnswers?.map((btn) => {
                        const selected = answers
                            .find((a) => a.questionId === currentQuestion.id)
                            ?.selectedButtonAnswers?.some((b) => b.id === btn.id);

                        return (
                            <button
                                key={btn.id}
                                className={`pre-reg-question__option-button ${selected ? 'pre-reg-question__option-button--selected' : ''
                                    }`}
                                onClick={() => handleButtonClick(btn)}
                            >
                                {btn.buttonText}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="pre-reg-question__action-container">
                <RightAlign>
                    <button
                        disabled={currentQuestion.isRequired && !haveAnswer}
                        className="pre-reg-question__next-button"
                        onClick={handleNext}
                    >
                        {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </RightAlign>
            </div>
        </div>
    );
};

export default PreRegDisplayQuestion;