import React, { useEffect, useState } from 'react'
import { usePointContext } from '../../context/PointContext';
import { PointFrontService } from '../../frontServices/FilterServicePoints';
import { DynamicQuestion } from '../../types/dynamicQuestion';
import { set } from 'react-hook-form';

export const PointAnswering = () => {
    const { visit, setVisit, servicePoints, setServicePoints } = usePointContext();
    const [currentServicePint, setCurrentServicePoint] = useState(servicePoints![0]);
    const [pointQuestions, setPointQuestions] = useState<DynamicQuestion[]>([]);

    useEffect(() => {
        const questions = PointFrontService.filterQuestions(visit!, currentServicePint);
        setPointQuestions(questions);
    }, [visit, currentServicePint]);

    return (
        <div>
            <pre>{JSON.stringify(visit, null, 2)}</pre>
        </div>
    )


}
