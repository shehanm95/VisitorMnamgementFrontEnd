import React, { ReactNode } from 'react'

import '../dashboard/dashboardComponents/visitOptions/visitType.css'
import { BlurBack } from './BlurBack';

interface PopUpProps {
    onClose: () => void;
    children: ReactNode
}

export const PopUpWindow: React.FC<PopUpProps> = ({ onClose, children }) => {
    return (
        <BlurBack>
            <div className="popup-form">
                <button onClick={onClose} className="popup-form-close" aria-label="Close">
                    ×
                </button>
                <h2 className="popup-form-title">Create Visitor Type</h2>
                <div>
                    {children}
                </div>

            </div>
        </BlurBack>
    );
};
