'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function TermsOfService() {
    const t = useTranslations('TermsOfService');

    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar />
            <div className="max-w-[800px] w-full mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-4">{t('termsOfService')}</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('introduction')}</h2>
                    <p>{t('introductionText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('acceptanceOfTerms')}</h2>
                    <p>{t('acceptanceOfTermsText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('userObligations')}</h2>
                    <ul className="list-disc ml-6">
                        <li>{t('userObligationsItem1')}</li>
                        <li>{t('userObligationsItem2')}</li>
                        <li>{t('userObligationsItem3')}</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('intellectualProperty')}</h2>
                    <p>{t('intellectualPropertyText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('disclaimerOfWarranties')}</h2>
                    <p>{t('disclaimerOfWarrantiesText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('limitationOfLiability')}</h2>
                    <p>{t('limitationOfLiabilityText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('indemnification')}</h2>
                    <p>{t('indemnificationText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('changesToTerms')}</h2>
                    <p>{t('changesToTermsText')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{t('contactInformation')}</h2>
                    <p>{t('contactInformationText')}</p>
                </section>

                <section className="mt-10 text-center">
                    <Link href="/" className="text-blue-500 hover:underline">{t('backToHome')}</Link>
                </section>
            </div>
            <Footer />
        </div>
    );
}
