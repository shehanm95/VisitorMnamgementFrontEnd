import React, { useEffect, useState } from "react";
import { useVisit } from "../../context/preRegContext";
import { LinkService } from "../../frontServices/LinkService";
import { useNavigate } from "react-router-dom";
import { ButtonAnswer } from "../../types/buttonAnswer";
import { DynamicQuestion } from "../../types/dynamicQuestion";
import { RightAlign } from "../common/RightAlign";
import './preRegdisplayQuestion.css';
import { AnswerType } from "../../types/AnswerType";

const PreRegDisplayQuestion: React.FC = () => {
    const { visit, setVisit } = useVisit();
    const linkService = LinkService.getInstance();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<DynamicQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [fieldValue, setFieldValue] = useState<string | number>('');
    const [hasAnswer, setHasAnswer] = useState(false);

    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (visit?.visitOption?.dynamicQuestions) {
            const visitQuestions = visit.visitOption.dynamicQuestions;
            setQuestions(visitQuestions);

            if (visitQuestions.length === 0) {
                console.log("No questions in this visit option");
                navigate(linkService.preReg.thankyou);
            }
        }
    }, [visit, navigate, linkService]);

    useEffect(() => {
        if (!currentQuestion) return;

        // Reset field values when question changes
        setFieldValue('');
        setHasAnswer(false);

        // Check for existing answer
        const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
        if (existingAnswer) {
            setHasAnswer(true);
            if (existingAnswer.value !== undefined) {
                setFieldValue(existingAnswer.value);
            }
        }
    }, [currentIndex, answers, currentQuestion]);

    const updateAnswer = (newAnswer: AnswerType) => {
        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === newAnswer.questionId);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newAnswer;
                return updated;
            }
            return [...prev, newAnswer];
        });
    };

    const handleInputChange = (value: string | number) => {
        if (!currentQuestion || !currentQuestion.id) return;

        const hasValue = value !== '' && value !== null && value !== undefined;
        setHasAnswer(hasValue);
        setFieldValue(value);

        updateAnswer({
            questionId: currentQuestion.id,
            dynamicQuestion: currentQuestion,
            answerType: currentQuestion.answerType,
            value: hasValue ? value : undefined,
        });
    };

    const handleButtonClick = (button: ButtonAnswer) => {
        if (!currentQuestion || !currentQuestion.id) return;

        const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
        let selected: ButtonAnswer[] = [];

        if (currentQuestion.canSelectMoreThanOne) {
            const alreadySelected = existingAnswer?.selectedButtonAnswers || [];
            const isSelected = alreadySelected.some(b => b.id === button.id);
            selected = isSelected
                ? alreadySelected.filter(b => b.id !== button.id)
                : [...alreadySelected, button];
        } else {
            selected = [button];
        }

        setHasAnswer(selected.length > 0);

        updateAnswer({
            questionId: currentQuestion.id,
            dynamicQuestion: currentQuestion,
            answerType: 'button',
            selectedButtonAnswers: selected,
        });
    };

    const handleNext = () => {
        // Validate required questions
        if (currentQuestion?.isRequired && !hasAnswer) {
            // You might want to show an error message here
            return;
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log("All answers:", answers);
            const updatedVisit = { ...visit };
            if (updatedVisit.realVisit) {
                updatedVisit.realVisit.dynamicAnswers = answers;
            }
            setVisit(updatedVisit);
            navigate(linkService.preReg.thankyou);
        }
    };

    if (!currentQuestion) {
        return <div className="pre-reg-question__loading">Loading...</div>;
    }

    return (
        <div className="pre-reg-question">
            <p className="pre-reg-question__progress">
                Question {currentIndex + 1} of {questions.length}
            </p>
            <h2 className="pre-reg-question__title">{currentQuestion.questionText}</h2>

            {currentQuestion.specialInstructions && (
                <p className="pre-reg-question__instructions">{currentQuestion.specialInstructions}</p>
            )}

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
                        disabled={currentQuestion.isRequired && !hasAnswer}
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