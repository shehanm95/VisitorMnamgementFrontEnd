import React, { useEffect, useState } from 'react'
import { VisitType } from '../../../types/visitType';
import { Center } from '../../common/Center';
import { FrontPageService } from '../../../frontServices/FrontPageSerivce';
import { OptionCard } from './OptionCart';
import { useNavigate } from 'react-router-dom';
import { LinkService } from '../../../frontServices/LinkService';

export const VisitOptionContainer = () => {
    const [visitType, setVisitType] = useState<VisitType | null>();
    const [loading, setLoading] = useState(true);
    const frontPage = FrontPageService.getInstance()
    const navigate = useNavigate()
    const links = LinkService.getInstance();

    useEffect(() => {
        const fetchType = () => {
            const type = frontPage.getSelectedVisitType();
            if (type == null) {
                navigate(links.frontOffice.visitTypes);
            }
            setVisitType(type);
            setLoading(false)
        }
        fetchType();
    }, [])

    return (
        <div className='w-100'>
            <div className="mt-2"></div>
            <div className="front-content">

                {visitType?.visitOptions.map((visitOption) => (
                    <OptionCard visitOption={visitOption} key={visitOption.id}></OptionCard>
                ))}


                {loading && <Center>
                    <p>Loading.....</p></Center>}
            </div>
        </div>
    )
}
