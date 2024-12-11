'use client';
import NavbarAuth from "@/components/NavbarAuth";
import { requestPasswordReset, resetPassword } from "@/shared/api";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const t = useTranslations("Authentication");

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');

    const [emailLoading, setEmailLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);

    const [emailError, setEmailError] = useState('');

    const router = useRouter();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleOTPChange(e) {
        setOTP(e.target.value);
    }

    async function handleEmailSubmit(e) {
        e.preventDefault();
        setEmailError('');

        if (!email) {
            setEmailError(t('emailRequired'));
            return;
        }

        setEmailLoading(true);
        try {
            const response = await requestPasswordReset(email);
            if (response) {
                toast.success(t('resetTokenHasBeenSent'))
            }
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setEmailLoading(false);
        }, 2000);
    }

    async function handleOTPSubmit(e) {
        e.preventDefault();

        if (!OTP) {
            setVerifyError(t('otpRequired'));
            return;
        }

        setVerifyLoading(true);
        try {
            const response = await resetPassword(email, OTP)
            if (response) {
                toast.success(t('resetPasswordSuccess'))
                router.push('/login')
            }
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setVerifyLoading(false);
        }, 2000);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavbarAuth />
            <div className="pt-10 w-full max-w-[500px] flex justify-center items-center flex-col gap-2">
                <label className="label">{t('forgotPassword')}</label>
                <div className="w-full mt-5">{t('enterYourMailToGetOTPCode')}</div>
                <form className="flex w-full max-w-[500px] gap-2" onSubmit={handleEmailSubmit}>
                    <input type="email" placeholder={t('enterYourMail')} className="inputBar" value={email} onChange={handleEmailChange} />
                    <button className="buttonMain" type="submit">
                        {!emailLoading ? t('send') : <div className="loading loading-dots"></div>}
                    </button>
                </form>
                {emailError && <p className="text-red-500">{emailError}</p>}
                <br />
                <div className="w-full">OTP</div>
                <form className="flex flex-col w-full max-w-[500px] gap-2" onSubmit={handleOTPSubmit}>
                    <input placeholder="XX XX XX" className="inputBar" value={OTP} onChange={handleOTPChange} />
                    <button className={`buttonMain`} type="submit">
                        {!verifyLoading ? t('verify') : <div className="loading loading-dots"></div>}
                    </button>
                </form>
            </div>

        </div>
    )
}
