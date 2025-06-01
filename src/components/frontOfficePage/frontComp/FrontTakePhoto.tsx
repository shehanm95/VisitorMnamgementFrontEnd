import React, { useState } from 'react';
import './css/frontTakePhotoPage.css'

const FrontTakePhoto: React.FC = () => {
    const [photo, setPhoto] = useState(); //set the suitable state,

    return (
        <div className="photo-page-photo-capture-container">
            <div className="photo-page-photo-frame">
                <img
                    src="/path-to-your-image.png"
                    alt="Captured"
                    className="photo-page-captured-photo"
                />
            </div>
            <div className="photo-page-sidebar">
                <p className="photo-page-ready-text">Ready</p>
                <div className="photo-page-circle">1</div>
                <div className="photo-page-circle active">2</div>
                <div className="photo-page-circle">3</div>
                <div className="photo-page-camera-icon" />
            </div>
            <div className="photo-page-button-group">
                <button className="photo-page-btn retake">Re-take</button>
                <button className="photo-page-btn ok">Ok</button>
            </div>
        </div>
    );
};

export default FrontTakePhoto;