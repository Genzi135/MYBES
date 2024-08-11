'use client'
import { setUserLocale } from "@/services/locale";
import icons from "@/shared/icons";
import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";

export default function LanguageSwitcher() {
    const t = useTranslations('Languages');
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const [selectedLang, setSelectedLang] = useState(locale);

    const handleLanguagesChange = (lang) => {
        setSelectedLang(lang);
        startTransition(() => {
            setUserLocale(lang);
        });
    };

    const langs = [
        {
            id: 'vn',
            name: t('VN'),
            label: t('vietnamese'),
            flag: icons?.vn
        }, {
            id: 'en',
            name: t('EN'),
            label: t('english'),
            flag: icons?.en
        },
    ];

    return (
        <div className="w-full flex gap-4">
            {langs.map((lang) => (
                <div
                    key={lang.id}
                    className="flex justify-center items-center p-2 gap-2 cursor-pointer"
                    onClick={() => handleLanguagesChange(lang.id)}
                >
                    <div className="w-8">{lang.flag}</div>
                    {lang.label}
                </div>
            ))}
        </div>
    );
}
