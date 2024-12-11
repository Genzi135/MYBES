'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFoundPost() {
    const t = useTranslations("404")
    return (
        <div className='min-h-full min-w-full mt-20 flex flex-col justify-center items-center gap-4'>
            <div className='text-[120px]'>
                404
            </div>
            <div className='font-semibold text-4xl'>
                Opps! Page not found
            </div>
            <div>{t('ohNoNothingHere')}</div>
            <Link href={'/'} className=''>
                <button className='btn btn-outline mt-6 text-lg font-semibold'>
                    {t('returnToHome')}
                </button>
            </Link>
        </div>
    )
}