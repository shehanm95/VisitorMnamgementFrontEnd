import React, { useEffect, useState } from 'react'
import { DynamicQuestion } from '../../../types/dynamicQuestion'
import { AnswerType } from '../../../types/AnswerType';
import { ButtonAnswer } from '../../../types/buttonAnswer';

export interface AnsweringToQuestionProps {
    question: DynamicQuestion;
    setAnswer: (answer: AnswerType) => void;
    incerementCurrentQuestionIndex: () => void;

}

export const AnsweringToQuestion = ({ question, setAnswer, incerementCurrentQuestionIndex }: AnsweringToQuestionProps) => {
    const [selectedButtonAnswers, setSelectedButtonAnswers] = useState<ButtonAnswer[]>([]);
    const [answerField, setAnswerFiled] = useState<string | number>('');
    const [hasAnswer, setHasAnswer] = useState<boolean>(false);

    function addToButtonAnswersArray(button: ButtonAnswer): void {
        if (selectedButtonAnswers.includes(button)) {
            setSelectedButtonAnswers(selectedButtonAnswers.filter(b => b !== button));
        } else {
            setSelectedButtonAnswers([...selectedButtonAnswers, button]);
        }
    }

    useEffect(() => {
        if (question.answerType === 'button' && selectedButtonAnswers.length > 0) {
            setHasAnswer(true);
        } else if (question.answerType !== 'button' && answerField) {
            setHasAnswer(true);
        } else {
            setHasAnswer(false);
        }
    }, [answerField, selectedButtonAnswers]);


    const settingFinalAnswer = (): void => {
        console.log("Setting final answer for question: ", question.questionText);
        const finalAnswer = {
            dynamicQuestion: question,
            answerType: question.answerType,
            value: answerField,
            selectedButtonAnswers: selectedButtonAnswers
        };
        setAnswer(finalAnswer!);
        incerementCurrentQuestionIndex()
    }


    return (
        <div className="point-answering-input-box">
            <label className="point-answering-input-label">{question.questionText}:</label>
            {question.answerType === 'text' && <input value={answerField} onChange={(e) => setAnswerFiled(e.target.value)} type="text" className="point-answering-input-field" />}
            {question.answerType === 'number' && <input value={answerField} onChange={(e) => setAnswerFiled(e.target.value)} type="number" className="point-answering-input-field" />}

            {question.answerType === 'button' &&
                <div className="point-answering-button-group">
                    {question.buttonAnswers?.map((button, index) => (
                        <button
                            key={index}
                            className="point-answering-button"
                            onClick={() => addToButtonAnswersArray(button)}
                        >
                            {button.buttonText}
                        </button>
                    ))}
                </div>}
            <button disabled={question.isRequired && !hasAnswer} style={question.isRequired ? { "backgroundColor": "gray !important" } : {}} onClick={() => settingFinalAnswer()} className="point-answering-small-btn">Set Answer</button>
        </div>

    )
}
