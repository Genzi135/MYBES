import { useTranslations } from "next-intl"
import Image from "next/image";
import { BsChat, BsExclamationTriangle, BsHeart, BsLink45Deg, BsThreeDotsVertical } from "react-icons/bs";

export default function Post() {
    const t = useTranslations('Post');
    return (
        <div className="w-full border p-[20px] rounded-box ">
            <div className="flex justify-between items-start w-full">
                <div className="flex w-full justify-start items-center gap-2 mb-[16px]">
                    <div className="avatar">
                        <div tabIndex={0} role="button" className="w-10 h-10 rounded-full">
                            <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'} width={20} height={20} alt="avatar" />
                        </div>
                    </div>
                    <div className="text-base ">Name</div>
                </div>
                <div className="text-gray-400">
                    time
                </div>
            </div>
            <div className="text-xl font-semibold mb-[12px]">
                Title
            </div>
            <div className="flex justify-center items-start flex-col sm:flex-row text-gray-400">
                <div className="w-full text-7-line mr-[20px]">
                    description
                </div>
                <Image src={'https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?w=290&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7'} alt="thumbnail" width={250} height={170} className="bg-black rounded-box w-full sm:w-[250px]" />
            </div>
            <div className="flex justify-between items-center mt-[20px]">
                <div className="flex justify-start items-center gap-6 ">
                    <div className="flex gap-2 justify-center items-center">
                        <BsHeart size={18} className="hover:scale-[1.2] duration-300 cursor-pointer" />
                        { }1000
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <BsChat size={18} />
                        { }1000
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button">
                        <BsThreeDotsVertical size={22} className="p-[3px] hover:bg-gray-200 rounded-sm" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><div className="flex justify-start items-center gap2"><BsExclamationTriangle size={18} />{t('report')}</div></li>
                        <li><div className="flex justify-start items-center gap2"><BsLink45Deg size={18} />{t('copyLink')}</div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}