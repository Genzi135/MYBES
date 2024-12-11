'use client';
import { useState, useEffect } from 'react';
import NavbarAuth from "@/components/NavbarAuth";
import { activeAccount, refreshOTP } from '@/shared/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function ActivePage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(300); // 300 giây = 5 phút

    const t = useTranslations("Authentication")
    const route = useRouter();

    useEffect(() => {
        let interval;
        if (isResendDisabled) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        return 300;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isResendDisabled]);

    const handleResendOtp = async () => {
        if (email) {
            const response = await refreshOTP(email);
            if (response) {
                setIsResendDisabled(true);
                toast.success(t('resentOTP'))
            }
        } else {
            toast.error(t('emailRequired'))
        }
    };

    const handleSubmit = async () => {
        console.log('submit', otp, email);
        const response = await activeAccount(otp, email);
        console.log(response);
        if (response.statusCode === 444) {
            toast.error(t("wrongCode"))
        }
        if (response.statusCode === 200) {
            toast.success(t('activeSuccess'))
            route.push('/login')
        }

    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <NavbarAuth />
            <div className="max-w-[500px] w-full h-auto flex flex-col justify-center items-center gap-5 mt-10">
                <h2 className="text-2xl font-bold text-center mb-4">{t('activeAccount')}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4 w-full"
                >
                    {/* Input Email */}
                    <div>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="inputBar"
                            placeholder="Email"
                        />
                    </div>

                    {/* Input OTP */}
                    <div>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="inputBar"
                            placeholder={t('inputOTP')}
                        />
                    </div>

                    {/* Nút Gửi lại OTP */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isResendDisabled}
                            className={`${isResendDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-black hover:bg-[#606060]'
                                } text-white text-nowrap flex flex-nowrap justify-center items-center p-[8px] px-[15px] rounded-[30px]`}
                        >
                            {isResendDisabled
                                ? t('resendOTP') + ` ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''
                                }${timer % 60}`
                                : t('resendOTP')}
                        </button>
                    </div>

                    {/* Nút Kích hoạt tài khoản */}
                    <div>
                        <button
                            type="submit"
                            className="w-full buttonMain"
                        >
                            {t('active')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
