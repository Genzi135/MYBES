'use client'
import Image from "next/image";
import MYBES_LOGO from '../assets/logo/logo-full-color-by-dukekindafat.jpg'
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./languages/LanguagesSwitcher";

export default function NavbarAuth() {
    const t = useTranslations("Navbar");
    const path = usePathname();
    return (
        <div className="w-full h-[60px] flex justify-center items-center border-b cursor-default">
            <div className="w-full h-full max-w-[1000px] flex justify-between items-center">
                <Image alt="logo" src={MYBES_LOGO} className="w-[auto] h-[50px]" />
                <div className="flex justify-center items-center gap-5">
                    <LanguageSwitcher />
                    <Link href={`/`} className="linkButton text-nowrap">{t('explore')}</Link>
                    <Link href={`/about`} className="linkButton text-nowrap">{t('about')}</Link>
                    {path === '/signup' ? <Link href={`/login`} className="buttonMain text-nowrap">{t('login')}</Link> : <Link href={`/signup`} className="buttonMain text-nowrap">{t('signup')}</Link>}
                </div>
            </div>
        </div>
    )
}