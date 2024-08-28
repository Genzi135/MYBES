'use client';
import NavbarAuth from "@/components/NavbarAuth";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ForgotPassword() {
    const t = useTranslations("Authentication");
    const [isOpenModal, setOpenModal] = useState(false);

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disableOTP, setDisableOTP] = useState(true);

    const [emailLoading, setEmailLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [verifyError, setVerifyError] = useState('');
    const [loadingError, setLoadingError] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleOTPChange(e) {
        setOTP(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleConfirmChange(e) {
        setConfirmPassword(e.target.value);
    }

    function handleEmailSubmit(e) {
        e.preventDefault();
        setEmailError('');

        if (!email) {
            setEmailError(t('emailRequired'));
            return;
        }

        setEmailLoading(true);
        // Giả lập việc gửi email
        setTimeout(() => {
            setEmailLoading(false);
            setDisableOTP(false); // Kích hoạt OTP input sau khi gửi email
        }, 2000);
    }

    function handleOTPSubmit(e) {
        e.preventDefault();
        setVerifyError('');

        if (!OTP) {
            setVerifyError(t('otpRequired'));
            return;
        }

        setVerifyLoading(true);
        // Giả lập việc xác minh OTP
        setTimeout(() => {
            setVerifyLoading(false);
            setOpenModal(true); // Mở modal khi OTP được xác minh
        }, 2000);
    }

    function handlePasswordSubmit(e) {
        e.preventDefault();
        setLoadingError('');

        if (!password || !confirmPassword) {
            setLoadingError(t('passwordsRequired'));
            return;
        }

        if (password !== confirmPassword) {
            setLoadingError(t('passwordsDoNotMatch'));
            return;
        }

        setLoading(true);
        // Giả lập việc thay đổi mật khẩu
        setTimeout(() => {
            setLoading(false);
            alert(t('passwordChangedSuccessfully'));
            setOpenModal(false); // Đóng modal sau khi thay đổi mật khẩu thành công
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
                    <input disabled={disableOTP} placeholder="XX XX XX" className="inputBar" value={OTP} onChange={handleOTPChange} />
                    <button disabled={disableOTP} className={`buttonMain ${disableOTP && 'btn btn-disabled'}`} type="submit">
                        {!verifyLoading ? t('verify') : <div className="loading loading-dots"></div>}
                    </button>
                </form>
                {verifyError && <p className="text-red-500">{verifyError}</p>}
            </div>
            {isOpenModal && <dialog className="w-full h-full flex justify-center items-center">
                <form className="flex flex-col gap-2 w-full max-w-[500px] bg-white p-5 rounded-[10px]" onSubmit={handlePasswordSubmit}>
                    <label className="label w-full flex justify-center items-center">{t('changePassword')}</label>
                    <div className="mt-2">{t('newPassword')}</div>
                    <input placeholder={t('newPassword')} className="inputBar" value={password} onChange={handlePasswordChange} />
                    <div className="mt-2">{t('confirmNewPassword')}</div>
                    <input placeholder={t('confirmNewPassword')} className="inputBar" value={confirmPassword} onChange={handleConfirmChange} />
                    <button className="buttonMain w-full mt-2" type="submit">
                        {!loading ? t('changePassword') : <div className="loading loading-dots"></div>}
                    </button>
                </form>
            </dialog>}
        </div>
    )
}
