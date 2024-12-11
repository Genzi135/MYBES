'use client'
import { useTranslations } from 'next-intl';
import MYBES_LOGO from '../assets/logo/MYBES Logo Original-02.svg';
import Link from 'next/link'
import Image from 'next/image';

export default function NotFound() {
    const t = useTranslations('404')
    return (
        <div className='min-h-full min-w-full h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4'>
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
            {/* <Image src={MYBES_LOGO} width={300} height={300} alt='logo' className='mt-6' /> */}
        </div>
    )
}