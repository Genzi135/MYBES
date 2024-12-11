import { useTranslations } from "next-intl"
import { useState } from "react";
import { BsLink45Deg, BsXLg } from "react-icons/bs";

export default function ShareLinkModal() {
    const t = useTranslations('Write');
    const [viewState, setViewState] = useState('write');
    return (
        <div className="modal-box w-full max-w-[800px] flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <label className="text-xl font-semibold">{t('shareALink')}</label>
                <form method="dialog" className="rounded-full p-2 hover:bg-gray-200 flex justify-center items-center">
                    <button><BsXLg size={20} /></button>
                </form>
            </div>
            <div className="space-y-2">
                <label>{t('title')}</label>
                <input type="text" className="inputBar font-semibold text-xl" placeholder={t('title')} />
            </div>
            <div className="space-y-2">
                <label className="flex gap-2"><BsLink45Deg size={20} />{t('URL')}</label>
                <input type="url" className="inputBar" placeholder={t('URL')} />
            </div>
            <div className="space-y-2">
                <label>{t('description')}</label>
                <textarea type="text" className="w-full p-[10px] text-[16px] border-[1px] border-[#A9A9A9] rounded-[10px] h-[150px] overflow-auto" placeholder={t('description')} />
            </div>
            <div className="flex justify-end items-center">
                <button className="buttonMain">{t('post')}</button>
            </div>
        </div>
    )
}