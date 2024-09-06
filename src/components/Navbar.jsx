'use client'
import Image from "next/image";
import MYBES_LOGO from '../assets/logo/logo-full-color-by-dukekindafat.jpg'
import Link from "next/link";
import { BsBell, BsBookmark, BsBoxArrowRight, BsLink, BsLink45Deg, BsNewspaper, BsPencilSquare, BsPersonSquare } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ShareLinkModal from "@/app/(pages)/write/components/ShareLinkModal";

export default function Navbar() {
    const t = useTranslations('Navbar');
    const currentUserID = 'Genzi';
    const path = usePathname();

    function OpenModal(modalName) {
        const name = modalName;
        document.getElementById(name).showModal();
    }
    return (
        <div className="w-full h-[60px] flex justify-center items-center border-b">
            <div className="w-full h-full max-w-[1200px] flex justify-between items-center">
                <Image alt="logo" src={MYBES_LOGO} className="w-[auto] h-[50px]" />
                <div className="flex justify-center items-center gap-5 mr-[10px]">
                    <div className="p-1 rounded-md hover:bg-gray-200 dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <BsPencilSquare size={20} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><Link href={`/write`} className="flex gap-2"><BsPencilSquare size={20} />{t('writeNewPost')}</Link></li>
                            <li>
                                <div className="flex gap-2"
                                    onClick={() => OpenModal('shareLinkModal')}>
                                    <BsLink45Deg size={20} /> {t('shareALink')}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="p-1 rounded-md hover:bg-gray-200 dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <BsBell size={20} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Noti 1</a></li>
                            <li><a>Noti 2</a></li>
                        </ul>
                    </div>
                    <div className="avatar dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="w-10 h-10 rounded-full">
                            <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'} width={20} height={20} alt="avatar" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu w-52 bg-white shadow p-2 rounded-box z-[1] space-y-2">
                            <label className="font-semibold text-lg">
                                Menu
                            </label>
                            <li>
                                <Link href={`/${currentUserID}`} className="flex gap-2"><BsPersonSquare size={20} />{t('profile')}</Link>
                            </li>
                            <li>
                                <Link href={`/${currentUserID}/blog`} className="flex gap-2"><BsNewspaper size={20} />{t('blog')}</Link>
                            </li>
                            <li>
                                <Link href={`/${currentUserID}/library`} className="flex gap-2"><BsBookmark size={20} />{t('library')}</Link>
                            </li>
                            <div className="w-full border-b"></div>
                            <li>
                                <Link href={`/${currentUserID}/settings`}>{t('settings')}</Link>
                            </li>
                            <li>
                                <Link href={`/helps`}>{t('helps')}</Link>
                            </li>
                            <div className="w-full border-b"></div>
                            <li>
                                <div className="flex gap-2 text-red-400">
                                    <BsBoxArrowRight size={20} /> {t('logOut')}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <dialog id="shareLinkModal" className="modal">
                <ShareLinkModal />
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}