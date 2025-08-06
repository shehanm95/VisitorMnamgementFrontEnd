import React, { useState, useEffect, useRef } from 'react';
import './css/frontForm.css';
import { LinkService } from '../../../frontServices/LinkService';
import { useNavigate } from 'react-router-dom';
import { FrontPageService } from '../../../frontServices/FrontPageSerivce';
import { EmailService } from '../../../services/EmailService';
import { toast } from 'react-toastify';

export interface EmailVerificationProps {
    nextUrl: string,
    givenEmail?: string,
    notFromFrontOffice?: boolean,
    closeVindow?: () => void
}

const EmailVerification = ({ nextUrl, givenEmail, notFromFrontOffice = false, closeVindow }: EmailVerificationProps) => {
    const [code, setCode] = useState(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(90); // 1:30 in seconds
    const [isExpired, setIsExpired] = useState(false);
    const [resending, setResending] = useState(false);
    const frontServices = FrontPageService.getInstance();
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const linkService = LinkService.getInstance();
    const emailService = new EmailService();

    useEffect(() => {
        if (!notFromFrontOffice && !frontServices.getCurrectVisitor()) {
            navigate(linkService.frontOffice.visitTypes);
        }
        inputRefs.current = Array(4).fill(null);
    }, []);

    useEffect(() => {
        if (notFromFrontOffice) {
            //   handleResend();
        }
    }, [])

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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleInputChange = (index: number, value: string) => {
        if (!/^[0-9]$/.test(value) && value !== '') return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleResend = async () => {
        let emailToResend: string = "";
        if (givenEmail && notFromFrontOffice) {
            emailToResend = givenEmail;
        } else {
            frontServices.getCurrectVisitor()?.email;
        }


        if (!emailToResend) return;

        try {
            setResending(true)
            await emailService.resendOpt(emailToResend);
            setTimeLeft(90);
            setIsExpired(false);
            setCode(['', '', '', '']);
            inputRefs.current[0]?.focus();
            setResending(false)
        } catch (error) {
            // toast already handled in service
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let emailToResend: string = "";
        if (givenEmail && notFromFrontOffice) {
            emailToResend = givenEmail;
        } else {
            frontServices.getCurrectVisitor()?.email;
        }

        if (!emailToResend) {
            toast.error("No email found for verification.");
            return;
        }

        const enteredCode = code.join('');
        if (enteredCode.length !== 4) {
            toast.error("Please enter the complete 4-digit code.");
            return;
        }

        try {
            await emailService.checkOpt({ email: emailToResend, digits: enteredCode });

            const visitor = frontServices.getCurrectVisitor();
            if (visitor) {
                visitor.isEmailVerified = true;
                frontServices.setCurrectVisitor(visitor);
            }

            if (closeVindow) {
                closeVindow()
            }
            setTimeout(() => navigate(0), 3000);
            navigate(nextUrl);
        } catch (error) {
            setIsExpired(true);
        }
    };

    return (
        <div className="f-form-container f-form-cernter-text center column">
            <h3 className="f-form-title">
                You have {formatTime(timeLeft)} minutes to verify
            </h3>
            <h1 className="f-form-title">Email Verification</h1>
            <form className="f-form" onSubmit={handleSubmit}>
                <div className="f-form-group">
                    <label className="f-form-label">
                        Enter the verification code that was sent to your email
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
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
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
                        type="button"
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
                        {isExpired ? (resending ? "Resending.." : "Resend") : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmailVerification;