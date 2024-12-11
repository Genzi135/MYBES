'use client'
import Image from "next/image";
import MYBES_LOGO from '../assets/logo/MYBES Logo Original-02.svg';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./languages/LanguagesSwitcher";

export default function NavbarAuth() {
    const t = useTranslations("Navbar");
    const path = usePathname();
    return (
        <div className="w-full h-[60px] flex justify-center items-center border-b cursor-default">
            <div className="w-full h-full max-w-[1200px] flex justify-between items-center">
                <Link href={'/'}>
                    <Image alt="logo" src={MYBES_LOGO} className="w-[auto] h-[35px]" />
                </Link>
                <div className="flex justify-center items-center gap-5">
                    <LanguageSwitcher />
                    <Link href={`/`} className="linkButton text-nowrap sm:flex hidden">{t('explore')}</Link>
                    <Link href={`/mybes.html`} className="linkButton text-nowrap sm:flex hidden" >{t('about')}</Link>
                    {path === '/register' ? <Link href={`/login`} className="buttonMain text-nowrap">{t('login')}</Link> : <Link href={`/register`} className="buttonMain text-nowrap">{t('signup')}</Link>}
                </div>
            </div>
        </div>
    )
}