import React from 'react'
import { DynamicQuestion } from '../../../types/dynamicQuestion'

export const DisplayQuestionAndAnswer = ({ question }: { question: DynamicQuestion }) => {
    return (
        <div className="point-answering-question">
            <p>this is question text :- {question.questionText} {question.answerType}</p>
            {question.answer ?
                <>
                    {(question.answer.answerType === 'text' || question.answer.answerType === 'number') &&
                        <p className="point-answering-answer">{question.answer.value}</p>}
                    {question.answer.answerType === 'button' &&
                        <div className="point-answering-button-answers">
                            {question.answer!.selectedButtonAnswers && question.answer.selectedButtonAnswers?.map((buttonAnswer, buttonIndex) => (
                                <span key={buttonIndex} className="point-answering-button">{buttonAnswer.buttonText}</span>
                            ))}
                        </div>
                    }
                </>
                :
                <p className="point-answering-no-answer">No answer provided</p>
            }
        </div>
    )
}
