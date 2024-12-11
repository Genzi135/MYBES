'use client';

import { useTranslations } from "next-intl";
import { BsReply } from "react-icons/bs";

export default function HeaderAvatarLeft({ props }) {
    const t = useTranslations('Components');

    const handleShareClick = (id) => {
        navigator.clipboard.writeText(window.location.origin + '/profile/' + id)
        navigator.share({
            title: t('shareProfile'),
            text: '',
            url: window.location.origin + '/profile/' + id
        })
    }

    if (!props) {
        return (
            <div className=" w-full flex max-h-[400px] h-full">
                <div className="p-2 sm:p-6 rounded-box min-w-[40%] flex justify-center items-center relative">
                    <div className="absolute bg-gray-100 min-w-[40%] h-full left-0 z-10"></div>
                    <img src={""} width={'100%'} height={'100%'} className="z-20 rounded-box min-w-[160px] min-h-[160px] sm:min-w-[300px] sm:min-h-[300px] bg-gray-300" />
                </div>
                <div className="bg-gray-100 min-w-[60%] relative">
                    <div className="p-2 sm:p-6 flex flex-col items-start absolute">
                        <div className="sm:mt-10 text-3xl font-semibold text-nowrap">Name</div>
                        <div className="flex gap-2 items-center">
                            <div className="text-gray-700 text-sm">Email</div>
                            <div
                                className="rounded-full hover:bg-gray-100/40 cursor-pointer p-[6px] tooltip flex justify-center items-center" data-tip={t('share')}>
                                <BsReply size={20} className="scale-x-[-1]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (<div className=" w-full flex max-h-[400px]h - full">
        <div className="p-2 sm:p-6 rounded-box min-w-[40%] flex justify-center items-center relative" >
            <div className="absolute  min-w-[40%] h-full left-0 z-10" style={{ backgroundColor: props?.color }}></div>
            <img src={props.avatar_url} width={'100%'} height={'100%'} className="rounded-box bg-gray-200 z-20 shadow-md" />
        </div>
        <div className="min-w-[60%] relative overflow-hidden" style={{ backgroundColor: props?.color }}>
            <div className="p-2 sm:p-6 flex flex-col items-start absolute">
                <div className="mt-10 text-3xl font-semibold text-nowrap">{props?.name}</div>
                <div className="flex gap-2 items-center">
                    <div className="text-gray-700 text-sm">{props?.email}</div>
                    <div
                        onClick={() => handleShareClick(props.email)}
                        className="rounded-full hover:bg-gray-100/40 cursor-pointer p-[6px] tooltip flex justify-center items-center" data-tip={t('share')}>
                        <BsReply size={20} className="scale-x-[-1]" />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}