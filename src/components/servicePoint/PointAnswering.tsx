import React, { useEffect, useRef, useState } from 'react'
import { usePointContext } from '../../context/PointContext';
import { PointFrontService } from '../../frontServices/PointFrontService';
import { DynamicQuestion } from '../../types/dynamicQuestion';
import './css/point-answering.css'
import { PointProfile } from './pointComps/PointProfile';
import { PointSpecialNoteTitle } from './pointComps/PointSpecialNoteTitle';
import { VisitorAnswersSections } from './pointComps/VisitorAnswersSections';
import { AnswerType } from '../../types/AnswerType';
import { AnsweringToQuestion } from './pointComps/AnsweringToQuestion';
import { PointShowRefsAndAskOffQuestions } from './pointComps/PointShowRefsAndAskOffQuestions';
import { Visit } from '../../types/visit';
import { VisitService } from '../../services/visitService';
import { useNavigate } from 'react-router-dom';
import { LinkService } from '../../frontServices/LinkService';
import { set } from 'react-hook-form';

export const PointAnswering = () => {
    const { visit, setVisit, servicePoints, setServicePoints } = usePointContext();
    const [currentServicePint, setCurrentServicePoint] = useState(servicePoints![0]);
    const [pointQuestions, setPointQuestions] = useState<DynamicQuestion[]>([]);
    const pointAnswers = useRef<AnswerType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestionIndexTEMP = useRef(0);
    const currentPointIndex = useRef(0);
    const navigate = useNavigate();
    const linkS = LinkService.getInstance();

    useEffect(() => {
        const questions = PointFrontService.getOfficerQuestionswithAnsweredReferences(visit!, currentServicePint);
        setPointQuestions(questions);
    }, [visit, currentServicePint]);

    const saveVisitWithOfficerAnswers = async (visit: Visit) => {
        const res = await VisitService.updateVisit(visit);
        console.log(res);
    }

    const setAnswer = (answer: AnswerType) => {
        console.log("Setting answer: ", answer);
        pointAnswers.current.push(answer);
    }


    const incerementCurrentQuestionIndex = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        currentQuestionIndexTEMP.current += 1;
        if (currentQuestionIndexTEMP.current < pointQuestions.length) {
            console.log("Incrementing question index");
        } else {
            if (currentPointIndex.current < servicePoints!.length - 1) {
                console.log("incrementing point index : ", currentPointIndex);
                currentPointIndex.current += 1;
                setCurrentServicePoint(servicePoints![currentPointIndex.current]);
                setPointQuestions(PointFrontService.getOfficerQuestionswithAnsweredReferences(visit!, servicePoints![currentPointIndex.current]));
                setCurrentQuestionIndex(0);
                currentQuestionIndexTEMP.current = 0;
                visit?.dynamicAnswers!.push(...pointAnswers.current);
                console.log("point answers: ", pointAnswers.current);
                console.log("point answers: ", visit?.dynamicAnswers!);
                setVisit(visit!);
                console.log("saving visit : ", visit);
                saveVisitWithOfficerAnswers(visit!);
                pointAnswers.current = [];
            } else {

                navigate(linkS.servicePoint.scan);
            }
        }
    }

    return (

        <div className="point-answering-container mt-3">
            {/* <!-- Profile Section --> */}
            <PointProfile visitor={visit?.visitor!}></PointProfile>

            {/* <!-- Special Notes Section --> */}
            <PointSpecialNoteTitle></PointSpecialNoteTitle>

            {/* <!-- Visitor Request Section --> */}
            {/* <!-- officer Answer Input Section --> */}
            <PointShowRefsAndAskOffQuestions
                officerQuestions={pointQuestions}
                setAnswer={setAnswer}
                dynamicAnswers={visit?.dynamicAnswers!}
                incerementCurrentQuestionIndex={incerementCurrentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
            ></PointShowRefsAndAskOffQuestions>

            {/* <!-- Navigation --> */}
            <div className="point-answering-footer">
                <button onClick={() => navigate(linkS.servicePoint.scan)} className="point-answering-btn">Back To Scanner</button>
            </div>
        </div>
    )


}
