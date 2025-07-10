import { useEffect, useState } from "react";
import { VisitOption } from "../../../types/visitOption";
import { VisitType } from "../../../types/visitType";
import './showPreRegOptionDetails.css'
import CEO from '../../frontOfficePage/frontComp/CEO.png'
import { VisitOptionService } from "../../../services/visitOptionService";
import { Utils } from "../../../frontServices/Utils";

export const ShowPreRegOptionDetails = ({ visitType, visitOption }: { visitType: VisitType; visitOption: VisitOption }) => {
    const [imagePath, setImagePath] = useState(CEO)


    useEffect(() => {
        const setOtionImage = async () => {
            if (visitOption.imageName) {
                const img = await VisitOptionService.getImage(visitOption.imageName)
                setImagePath(URL.createObjectURL(img))
            }
            setOtionImage();
        }
    }, [])

    return (

        <div className="pre-op-details">
            <h3 className="pre-op-header">Visit Option Details.</h3>
            <div className="pre-op-detailRow">
                <div className="pre-op-detailTitle">Visit Option Name</div>
                <div className="pre-op-detailValue">:{" "}{Utils.toTitleCase(visitOption.visitOptionName)}</div>
            </div>
            <div className="pre-op-detailRow">
                <div className="pre-op-detailTitle">Visiting Type</div>
                <div className="pre-op-detailValue">:{" "}{Utils.toTitleCase(visitType.visitTypeName)}</div>
            </div>
            {visitOption.description && <div className="pre-op-detailRow">
                <div className="pre-op-detailTitle">Description</div>
                <div className="pre-op-detailValue">:{" "}{Utils.toTitleCase(visitOption.description)}</div>
            </div>}
            <div className="pre-op-detailRow">
                <div className="pre-op-detailTitle">Cover Image</div>
                <div className="pre-op-detailValue">{" "}
                    <img src={imagePath} alt={`iamge ${visitOption.visitOptionName}`} />
                </div>
            </div>
        </div>
    );
};
