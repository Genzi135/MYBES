'use client'
import React from 'react';
import { useTranslations } from 'next-intl';
import { BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import useLoginForm from '../hooks/useLogin';

export default function LoginForm() {
    const t = useTranslations('Authentication');
    const { formData, errors, isLoading, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="max-w-[500px] w-full h-auto flex flex-col justify-center items-center gap-5">
            <label className="label p-10">{t('login')}</label>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <input
                    placeholder={t('emailLabel')}
                    type="email"
                    name="email"
                    className="inputBar"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <input
                    placeholder={t('passwordLabel')}
                    type="password"
                    name="password"
                    className="inputBar"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                <button
                    type="submit"
                    className="buttonMain w-full h-[50px]"
                    disabled={isLoading}
                >
                    {isLoading ? <span class="loading loading-dots loading-md"></span> : t('login')}
                </button>
            </form>
            <div className="w-full h-auto flex justify-end items-center mr-10 text-[#A9A9A9] hover:underline">
                <Link href="/forgot-password">{t('forgotPassword')}</Link>
            </div>
            <div className="w-full h-full flex justify-center items-center text-[#A9A9A9]">
                <label>{t('orLoginWith')}</label>
            </div>
            <div className="w-full h-auto p-5">
                <button className="buttonOutline w-full h-[50px] gap-2">
                    <BsGoogle />
                    Google
                </button>
            </div>
            <div className="w-full h-auto flex justify-center items-center mr-10 text-[#A9A9A9] hover:underline">
                <Link href="/signup">{t('newToMYBES?SinupHere')}</Link>
            </div>
        </div>
    );
}
