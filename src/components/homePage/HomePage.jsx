'use client'
import { useTranslations } from "use-intl";
import Post from "../post/Post";
import { useState } from "react";
import { BsStars } from "react-icons/bs";

export default function HomePage() {
    const t = useTranslations('HomePage');
    const [viewState, setViewState] = useState("new")

    function changeViewState(viewState) {
        setViewState(viewState);
    }
    return (<div className="flex justify-center items-start min-h-[90vh] w-full max-w-[1000px]">
        <div className="flex flex-col w-full max-w-[800px]">
            <div className=" flex pt-[10px] pb-[10px] gap-2">
                <div className={` ${viewState === 'new' ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"} p-[10px] flex gap-2`}
                    onClick={() => changeViewState('new')}><BsStars size={20} />{t('new')}</div>
                <div className={` ${viewState === 'following' ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"} p-[10px] `}
                    onClick={() => changeViewState('following')}>{t('following')}</div>
            </div>
            <div className="flex flex-col p-[10px]">
                <Post />
            </div>
        </div>
        {/* <div className=" hidden lg:flex flex-col h-[100%] w-full max-w-[200px]">
            tag
        </div> */}
    </div>)
}