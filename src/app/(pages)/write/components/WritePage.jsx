'use client'

import { useTranslations } from "next-intl"
import { useState } from "react";

export default function WritePage() {
    const t = useTranslations('Write');
    const [writeState, setWriteState] = useState('post');

    function changeWriteState(state) {
        setWriteState(state);
    }
    return (
        <div className="max-w-[800px] w-full min-h-[90vh] flex flex-col">
            <div className="flex justify-start items-center gap-2">
                <label className={`${writeState === 'post' ? 'border-b cursor-default' : "cursor-pointer"} p-2 border-black transition ease-linear duration-300`}
                    onClick={() => changeWriteState('post')}
                >{t('writeAPost')}</label>
                <label className={`${writeState === 'link' ? 'border-b cursor-default' : "cursor-pointer"} p-2 border-black transition ease-linear duration-300`}
                    onClick={() => changeWriteState('link')}
                >{t('shareALink')}</label>
            </div>
        </div>
    )
}