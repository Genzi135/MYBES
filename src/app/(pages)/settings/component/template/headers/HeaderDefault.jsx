'use client';

import { useTranslations } from "next-intl";
import { BsReply, BsShare } from "react-icons/bs";

export default function HeaderDefault({ props }) {
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
                <div className="bg-gray-100 w-full p-2 sm:p-6 flex flex-col justify-center items-center relative">
                    <div className="flex justify-center items-center mt-4">
                        <img src={""} width={'100%'} height={'100%'} className="z-20 rounded-full min-w-[100px] min-h-[100px] sm:min-w-[200px] sm:min-h-[200px] bg-gray-300" />
                    </div>
                    <div className="text-3xl font-semibold text-nowrap mt-2">Name</div>
                    <div className="flex gap-2 justify-center">
                        <div className="text-gray-500 text-sm">email</div>
                        <div
                            className="rounded-full hover:bg-gray-100 cursor-pointer p-[6px] tooltip" data-tip={t('share')}>
                            <BsShare size={18} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className=" w-full flex max-h-[400px] h-full ">
            <div className="w-full p-2 sm:p-6 flex flex-col justify-center items-center relative" style={{ backgroundColor: props?.color }}>
                <div className="flex justify-center items-center mt-4">
                    <img src={props?.avatar_url} width={'100%'} height={'100%'} className=" rounded-full max-w-[100px] max-h-[100px] sm:max-w-[200px] sm:max-h-[200px] bg-gray-300" />
                </div>
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
    )
}