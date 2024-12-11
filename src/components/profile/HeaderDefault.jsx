'use client'
import { useTranslations } from "next-intl";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";
import MYBES_LOGO from "../../assets/logo/MYBES Logo Original-02.svg"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderDefault({ data }) {
    const t = useTranslations('Components');
    const [hash, setHash] = useState('profile');

    const router = useRouter();

    const handleChangeState = (hash) => {
        router.push('#' + hash)
        setHash(hash)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText('https://www.mybes.vn/profile/' + data.email).then(() => {
            toast.success(t('copyLinkSuccess'))
        })
    }
    return (
        <div className="w-full flex flex-col">
            <div className="w-full h-[300px] sm:h-[365px] flex relative rounded-b-md     shadow-md">
                {data && data.background_url ? <div className="w-full h-[180px] sm:h-[235px] bg-black/20 absolute">

                </div> : <div className="w-full h-[165px] sm:h-[235px] bg-gray-200 absolute flex justify-center items-center">
                    <Image src={MYBES_LOGO} width={'auto'} height={'auto'} alt="avatar" className="w-full max-h-[180px] sm:h-[235px] p-5" content="fit" />
                </div>}
                <div className="absolute flex bottom-4 left-[20px] sm:left-[50px]">
                    <div className="avatar ">
                        <div className="w-[135px] h-[135px] rounded-lg ">
                            {data && data.avatar_url && <img src={data.avatar_url} width={80} height={80} alt="avatar" loading="eager" />}
                        </div>
                    </div>
                    <div className="ml-4 flex flex-col justify-center h-[120px] ">
                        <div className="text-2xl font-semibold">
                            {data && data.name && data.name}
                        </div>
                        <div className="flex gap-2 justify-start items-center">
                            <div>
                                {data && data.email && data.email}
                            </div>
                            <div
                                onClick={() => handleCopyLink()}
                                className="p-2 hover:bg-gray-300 rounded-full cursor-pointer tooltip" data-tip={t('copyLink')}>
                                <BsLink45Deg size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex gap-4">
                <div onClick={() => handleChangeState('profile')} className={`linkButton ${hash === "profile" ? "font-semibold" : ""}`}>profile</div>
                <div onClick={() => handleChangeState('blogs')} className={`linkButton ${hash === "blogs" ? "font-semibold" : ""}`}>blogs</div>
            </div> */}
        </div>
    );
}
