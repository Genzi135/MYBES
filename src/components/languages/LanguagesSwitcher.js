'use client';

import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { HiLanguage } from "react-icons/hi2";
import vn from "../../../public/vn.svg"
import us from "../../../public/us.svg"
import Image from "next/image";

export default function LanguageSwitcher() {
    const t = useTranslations('Languages');
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const [selectedLang, setSelectedLang] = useState(locale);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLanguagesChange = (lang) => {
        setSelectedLang(lang);
        startTransition(() => {
            setUserLocale(lang);
        });
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    const langs = [
        {
            id: 'vn',
            name: t('VN'),
            label: t('vietnamese'),
            flag: vn
        },
        {
            id: 'en',
            name: t('EN'),
            label: t('english'),
            flag: us
        },
    ];

    return (
        <div className="relative w-full flex gap-4">
            <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="btn m-1 flex items-center gap-2"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
            >
                <HiLanguage size={18} />
                <span className="hidden sm:block">{t('languages')}</span>
            </button>
            {isDropdownOpen && (
                <ul
                    className="absolute top-full right-0 mt-2 bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-switcher"
                >
                    {langs.map((lang) => (
                        <li
                            key={lang.id}
                            className="flex hover:bg-gray-100 justify-start items-center text-base p-2 cursor-pointer"
                            onClick={() => handleLanguagesChange(lang.id)}
                            role="menuitem"
                        >
                            {lang.flag && <Image src={lang.flag} alt="" className="mr-2 w-6 h-4" />}
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
