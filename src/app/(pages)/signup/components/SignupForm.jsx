'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { BsEyeFill, BsEyeSlashFill, BsGoogle } from 'react-icons/bs';
import Link from 'next/link';
import useSignupForm from '../hooks/useSignup';

export default function SignupForm() {
    const t = useTranslations('Authentication');
    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword
    } = useSignupForm();

    return (
        <div className="max-w-[500px] w-full h-auto flex flex-col justify-center items-center gap-5">
            <label className="label p-10">{t('signup')}</label>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
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
                </div>
                <div className="relative w-full h-auto">
                    <input
                        placeholder={t('passwordLabel')}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="inputBar"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                <div className="relative w-full h-auto">
                    <input
                        placeholder={t('confirmPasswordLabel')}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="inputBar"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                <div className='w-full flex flex-wrap gap-2 text-[#A9A9A9]'>
                    <input
                        type='checkbox'
                        name='termsAccepted'
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                    />
                    <label className='gap-2 flex'>
                        <div> {t('iAcceptWith')}</div>
                        <Link href={'/terms'} className='underline font-bold'>
                            {t('terms')}
                        </Link>
                        &
                        <Link href={'/privacy-policy'} className='underline font-bold'>
                            {t('privatePolicy')}
                        </Link>
                    </label>
                    {errors.termsAccepted && <p className="text-red-500">{errors.termsAccepted}</p>}
                </div>
                <button
                    type="submit"
                    className="buttonMain w-full h-[50px]"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : t('signup')}
                </button>
            </form>
            <div className="w-full h-full flex justify-center items-center text-[#A9A9A9]">
                <label>{t('orSignupWith')}</label>
            </div>
            <div className="w-full h-auto p-5">
                <button className="buttonOutline w-full h-[50px] gap-2">
                    <BsGoogle />
                    Google
                </button>
            </div>
            <div className="w-full h-auto flex justify-center items-center mr-10 text-[#A9A9A9] hover:underline">
                <Link href="/login">{t('alreadyHaveAnAccount?LoginHere')}</Link>
            </div>
        </div>
    );
}
