import React, { useEffect, useState } from 'react';
import { DummyService } from '../../../services/DummyService';
import { DynamicQuestion } from '../../../types/dynamicQuestion';
import { AnswerType } from '../../../types/AnswerType';
import { ButtonAnswer } from '../../../types/buttonAnswer';
import { RightAlign } from '../../common/RightAlign';
import { FrontPageService } from '../../../frontServices/FrontPageSerivce';
import { useNavigate } from 'react-router-dom';
import { LinkService } from '../../../frontServices/LinkService';
import { DynamicQuestionService } from '../../../services/DyanmicQuestionService';

const FrontDisplayQuestion: React.FC = () => {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [questions, setQuestions] = useState<DynamicQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [haveAnswer, setHaveAnswer] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // const fetchedQuestions = DummyService.getQuestions();
        const getQuestions = async () => {
            const option = FrontPageService.getInstance().getSelectedVisitOption();
            const id = option?.id || 0;
            const fetchedQuestions = await DynamicQuestionService.getQuestionsByVisitOptionId(id);
            if (fetchedQuestions) {
                setQuestions(fetchedQuestions);
            } else {
                navigate(LinkService.getInstance().frontOffice.takePhoto)
            }
        }
        getQuestions();
    }, []);

    const currentQuestion = questions[currentIndex];

    const updateAnswer = (newAnswer: AnswerType) => {
        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === newAnswer.questionId);
            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newAnswer;
                return updated;
            } else {
                return [...prev, newAnswer];
            }
        });
    };

    const handleInputChange = (value: string | number) => {
        if (!currentQuestion || currentQuestion.id == null) return;
        if (value) {
            console.log(haveAnswer, value)
            setHaveAnswer(true);
        }
        updateAnswer({
            questionId: currentQuestion.id,
            dynamicQuestion: currentQuestion,
            answerType: currentQuestion.answerType,
            value,
        });


    };

    const handleButtonClick = (button: ButtonAnswer) => {
        if (!currentQuestion || currentQuestion.id == null) return;

        const existing = answers.find(a => a.questionId === currentQuestion.id);
        let selected: ButtonAnswer[] = [];
        if (selected) {
            setHaveAnswer(true);
        }

        if (currentQuestion.canSelectMoreThanOne) {
            const alreadySelected = existing?.selectedButtonAnswers || [];
            const isSelected = alreadySelected.some(b => b.id === button.id);
            selected = isSelected
                ? alreadySelected.filter(b => b.id !== button.id)
                : [...alreadySelected, button];
        } else {
            selected = [button];
        }

        updateAnswer({
            questionId: currentQuestion.id,
            dynamicQuestion: currentQuestion,
            answerType: 'button',
            selectedButtonAnswers: selected,
        });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log('All Answers:', answers);
        }
        setHaveAnswer(false);

    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className='flex center column w-100'>
            <p className='m-3'>Question {currentIndex + 1} of {questions.length}</p>
            <h2>{currentQuestion.questionText}</h2>
            <div className="mt-3"></div>
            {currentQuestion.answerType === 'text' && (
                <input
                    className='f-form-input w-100 text-center'
                    type="text"
                    onChange={e => handleInputChange(e.target.value)}
                />
            )}

            {currentQuestion.answerType === 'number' && (
                <input
                    className='f-form-input w-100 text-center'
                    type="number"
                    onChange={e => handleInputChange(Number(e.target.value))}
                />
            )}

            {currentQuestion.answerType === 'button' && (
                <div>
                    {currentQuestion.buttonAnswers?.map(btn => {
                        const selected = answers
                            .find(a => a.questionId === currentQuestion.id)
                            ?.selectedButtonAnswers?.some(b => b.id === btn.id);

                        return (
                            <button
                                key={btn.id}
                                className={`front-Button ${selected ? 'front-button-selected' : ''}`}
                                onClick={() => handleButtonClick(btn)}
                            >
                                {btn.buttonText}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="m-5"></div>
            <div className="w-100 mt-5">
                <RightAlign>
                    <button disabled={currentQuestion.isRequired && !haveAnswer} className='front-Button' onClick={handleNext}>
                        {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
                    </button>
                </RightAlign>
            </div>
        </div>
    );
};

export default FrontDisplayQuestion;
