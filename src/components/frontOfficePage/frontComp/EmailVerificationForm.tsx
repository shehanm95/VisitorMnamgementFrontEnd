import React, { useState, useEffect, useRef } from 'react';
import './css/frontForm.css';
import { LinkService } from '../../../frontServices/LinkService';
import { useNavigate } from 'react-router-dom';
import { FrontPageService } from '../../../frontServices/FrontPageSerivce';

const EmailVerification: React.FC = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(90); // 1:30 in seconds
    const [isExpired, setIsExpired] = useState(false);
    const frontServices = FrontPageService.getInstance()
    // Explicitly type the ref as an array of HTMLInputElement or null
    const navigate = useNavigate()
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const linkService = LinkService.getInstance()
    // Initialize the refs array with null values for each input
    useEffect(() => {
        if (frontServices.getCurrectVisitor() == null) {
            navigate(linkService.frontOffice.visitTypes)
        }
        inputRefs.current = Array(4).fill(null);
    }, []);

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle input change and auto-focus
    const handleInputChange = (index: number, value: string) => {
        if (!/^[0-9]$/.test(value) && value !== '') return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if a number is entered
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle resend button click
    const handleResend = () => {
        setTimeLeft(90);
        setIsExpired(false);
        setCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
    };



    return (
        <div className="f-form-container f-form-cernter-text center column">
            <h3 className="f-form-title">
                you have {formatTime(timeLeft)} minutes to verify
            </h3>
            <h1 className="f-form-title">Email Verification</h1>
            <form className="f-form">
                <div className="f-form-group">
                    <label className="f-form-label">
                        enter the verification code that received to your email
                    </label>
                    <div className="code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                disabled={isExpired}
                                className="code-input"
                            />
                        ))}
                    </div>
                    <p className="f-form-label">
                        {frontServices.getCurrectVisitor()?.email}
                    </p>
                </div>
                <div className="form-actions">
                    <button
                        className="f-form-submit"
                        onClick={() => navigate(linkService.frontOffice.register)}
                    >
                        Change Email
                    </button>
                    <button
                        type="submit"
                        className="f-form-submit"
                        disabled={isExpired && timeLeft <= 0}
                        onClick={isExpired ? handleResend : undefined}
                    >
                        {isExpired ? 'Resend' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerification;