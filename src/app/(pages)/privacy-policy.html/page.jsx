'use client'

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';



export default function PrivacyPolicy() {
    const t = useTranslations('PrivacyPolicy');

    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar />
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{t('privacyPolicy')}</h1>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('introduction')}</h2>
                    <p className="mt-2">{t('introductionText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('informationWeCollect')}</h2>
                    <h3 className="text-xl font-semibold mt-4">{t('personalInformation')}</h3>
                    <p className="mt-2">{t('personalInformationText')}</p>
                    <h3 className="text-xl font-semibold mt-4">{t('nonPersonalInformation')}</h3>
                    <p className="mt-2">{t('nonPersonalInformationText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('howWeUseYourInformation')}</h2>
                    <p className="mt-2">{t('howWeUseYourInformationText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('cookiesAndTrackingTechnologies')}</h2>
                    <p className="mt-2">{t('cookiesAndTrackingTechnologiesText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('thirdPartyServices')}</h2>
                    <p className="mt-2">{t('thirdPartyServicesText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('dataSecurity')}</h2>
                    <p className="mt-2">{t('dataSecurityText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('yourRights')}</h2>
                    <p className="mt-2">{t('yourRightsText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('changesToPrivacyPolicy')}</h2>
                    <p className="mt-2">{t('changesToPrivacyPolicyText')}</p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold">{t('contactUs')}</h2>
                    <p className="mt-2">{t('contactUsText')}</p>
                </section>
                <div className="text-center mt-6">
                    <Link href="/" className="text-blue-500 hover:underline">{t('backToHome')}</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
