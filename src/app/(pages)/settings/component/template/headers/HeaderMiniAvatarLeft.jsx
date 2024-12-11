'use client';

import { useTranslations } from "next-intl";
import { BsReply } from "react-icons/bs";

export default function HeaderMiniAvatarLeft({ props }) {
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
                <div className="p-2 sm:p-6 rounded-box w-full h-full flex justify-center items-center relative">
                    <div className="absolute bg-gray-100 min-h-[45%] w-full top-0 z-10"></div>
                    <div className="z-20 w-full flex items-center gap-4">
                        <img src={""} width={'100%'} height={'100%'} className="mt-20 rounded-box min-w-[100px] min-h-[100px] sm:w-[150px] sm:h-[150px] bg-gray-300" />
                        <div className="flex flex-col mt-10">
                            <div className="text-3xl font-semibold text-nowrap mt-2">Name</div>
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
            </div>
        )
    }

    return (
        <div className=" w-full flex max-h-[400px] h-full">
            <div className="p-2 sm:p-6 rounded-box w-full h-full flex justify-center items-center relative">
                <div className="absolute bg-gray-100 min-h-[45%] w-full top-0 z-10" style={{ backgroundColor: props?.color }}></div>
                <div className="z-20 w-full flex items-center gap-4">
                    <img src={props?.avatar_url} width={'100%'} height={'100%'} className="mt-20 rounded-box min-w-[100px] min-h-[100px] sm:w-[150px] sm:h-[150px] bg-white shadow-md" />
                    <div className="flex flex-col mt-10">
                        <div className="text-3xl font-semibold text-nowrap mt-2">{props?.name}</div>
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
            </div>
        </div>
    )
}