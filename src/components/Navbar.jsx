'use client';
import Image from "next/image";
import MYBES_LOGO from '../assets/logo/MYBES Logo Original-02.svg';
import Link from "next/link";
import { BsBell, BsBookmark, BsBoxArrowRight, BsLink45Deg, BsNewspaper, BsPencilSquare, BsPersonSquare, BsSearch } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ShareLinkModal from "@/app/(pages)/write.html/components/ShareLinkModal";
import LanguageSwitcher from "./languages/LanguagesSwitcher";
import { useSelector, useDispatch } from 'react-redux'; // Import hooks from Redux
import { useEffect, useState } from "react";
import { setLogOut, setUser } from "@/hook/redux/features/userSlice";

export default function Navbar() {
    const t = useTranslations('Navbar');
    const router = useRouter();
    const login = useSelector((state) => state.user.login);
    const userData = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    // State cho tìm kiếm
    const [searchQuery, setSearchQuery] = useState("");

    function OpenModal(modalName) {
        const name = modalName;
        document.getElementById(name).showModal();
    }

    function onLogOutClick() {
        window.localStorage.removeItem('token');
        dispatch(setUser(null));
        dispatch(setLogOut())
        router.push('/login');
    }

    // Hàm xử lý tìm kiếm khi người dùng nhập
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Hàm chuyển hướng đến trang tìm kiếm
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search#${searchQuery}`);
        }
    };

    return (
        <div className="w-full h-[60px] flex justify-center items-center border-b z-50">
            <div className="w-full h-full max-w-[1200px] flex justify-between items-center">
                <Link href={'/'} className="sm:ml-4">
                    <Image alt="logo" src={MYBES_LOGO} className="w-[auto] h-[35px]" />
                </Link>

                <div className="flex justify-center items-center gap-4 border-[1px] p-2 rounded-md " onClick={() => { router.push('/search') }}>
                    <div className="hidden sm:block text-nowrap cursor-pointer">{t('searchPlaceholder')}</div>
                    <button type="submit" className="" >
                        <BsSearch className="text-gray-500" />
                    </button>
                </div>

                <div className="flex justify-center items-center gap-5 mr-[10px]">

                    <LanguageSwitcher />

                    {login ? (
                        <>
                            <div className="p-1 rounded-md hover:bg-gray-200 dropdown dropdown-end tooltip-bottom tooltip" data-tip={t('writeNewPost')}>
                                <Link href={`/write.html`} className="flex gap-2"><BsPencilSquare size={20} /></Link>
                            </div>
                            <div className="avatar dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="w-10 h-10 rounded-lg">
                                    {userData && <img src={userData.avatar_url} width={20} height={20} alt="avatar" />}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu w-52 bg-white shadow p-2 rounded-box z-[1] space-y-2">
                                    <label className="font-semibold text-lg">Menu</label>
                                    <li>
                                        <Link href={`/profile/`} className="flex gap-2"><BsPersonSquare size={20} />{t('profile')}</Link>
                                    </li>
                                    <li>
                                        <Link href={`/profile#blog`} className="flex gap-2"><BsNewspaper size={20} />{t('blog')}</Link>
                                    </li>
                                    <li>
                                        <Link href={`/profile#saved`} className="flex gap-2"><BsBookmark size={20} />{t('saved')}</Link>
                                    </li>
                                    <div className="w-full border-b"></div>
                                    <li>
                                        <Link href={`/settings`}>{t('settings')}</Link>
                                    </li>
                                    <li>
                                        <a href={`/mybes.html#helps`}>{t('helps')}</a>
                                    </li>
                                    <div className="w-full border-b"></div>
                                    <li>
                                        <div className="flex gap-2 text-red-400" onClick={() => { onLogOutClick() }}>
                                            <BsBoxArrowRight size={20} /> {t('logOut')}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center gap-5">
                            {/* <Link href={`/`} className="linkButton text-nowrap">{t('explore')}</Link> */}
                            <Link href={`/mybes.html`} className="linkButton text-nowrap hidden sm:block">{t('about')}</Link>
                            <Link href={`/login`} className="buttonMain text-nowrap">{t('login')}</Link>
                        </div>
                    )}
                </div>
            </div>

            <dialog id="shareLinkModal" className="modal">
                <ShareLinkModal />
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
