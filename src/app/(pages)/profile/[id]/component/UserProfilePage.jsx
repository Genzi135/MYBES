'use client';

import RenderComponent from "@/app/(pages)/settings/component/template/components/RenderComponent";
import HeaderSelected from "@/app/(pages)/settings/component/template/headers/HeaderSelected";
import Post from "@/components/post/Post";
import { getUserById } from "@/shared/api";
import { getBlogsByUser } from "@/shared/blogAPI";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BACKGROUND_IMAGE from '../../../../../assets/logo/MYBES Logo Original-02.svg';
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [blogList, setBlogList] = useState([]);
    const [viewState, setViewState] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const t = useTranslations('Profile')

    const path = usePathname();

    const getUserId = () => path.replace("/profile/", "");

    // Lấy dữ liệu người dùng
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userId = getUserId();
            const response = await getUserById(userId);
            setUserData(response || {});
        } catch (err) {
            setError("Không thể tải dữ liệu người dùng");
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogData = async (page = 1) => {
        try {
            setLoading(true);
            const userId = getUserId();
            const response = await getBlogsByUser(userId, page);
            if (response && response.length > 0) {
                setBlogList((prev) => [...prev, ...response]);
                setHasMore(response.length === 10);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setError("Không thể tải blog");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchBlogData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore && !loading) {
                setCurrentPage((prev) => prev + 1);
                fetchBlogData(currentPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage, hasMore, loading]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center max-w-[800px] pb-[50px]">
            {userData?.page?.header?.id && <HeaderSelected id={userData.page.header.id} props={userData} />}

            <div className="flex gap-4 py-2">
                {["profile", "blog"].map((state) => (
                    <div
                        key={state}
                        className={`p-[10px] flex gap-2 ${viewState === state
                            ? "cursor-default border-b border-black"
                            : "text-[#A9A9A9] cursor-pointer"
                            }`}
                        onClick={() => setViewState(state)}
                    >
                        {state === "profile" ? t('profile') : t('blogs')}
                    </div>
                ))}
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {loading && (
                <div className="text-center py-4">
                    <span className="loading loading-dots"></span>
                </div>
            )}

            {viewState === "profile" && (
                <div className="w-full">
                    {userData?.page?.body?.length > 0 ? (
                        userData.page.body.map((e, index) => (
                            <RenderComponent id={e.id} key={index} props={e.props} />
                        ))
                    ) : (
                        <div className="w-full h-full mt-4">
                            <Image
                                src={BACKGROUND_IMAGE}
                                alt="default background"
                                width="100%"
                                height="100%"
                                className="opacity-25"
                            />
                        </div>
                    )}
                </div>
            )}

            {viewState === "blog" && (
                <div className="flex flex-col p-[10px] gap-[20px] w-full">
                    {blogList.length > 0 ? (
                        blogList.map((e) => (
                            <div key={e.id} className="w-full">
                                <Post data={e} />
                            </div>
                        ))
                    ) : (
                        <div>{t('youHaveNoSavedBlog')}</div>
                    )}
                </div>
            )}
        </div>
    );
}
