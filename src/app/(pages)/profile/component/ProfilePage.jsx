'use client';

import { getBlogsByUser, getSavedBlogsWithUser } from "@/shared/blogAPI";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderSelected from "../../settings/component/template/headers/HeaderSelected";
import RenderComponent from "../../settings/component/template/components/RenderComponent";
import BACKGROUND_IMAGE from '../../../../assets/logo/MYBES Logo Original-02.svg';
import Image from "next/image";
import PostProfile from "@/components/post/PostProfile";
import { addBlogsProfile, setListBlogProfile } from "@/hook/redux/features/profileSlice";
import PostSave from "@/components/post/PostSave";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
    const userData = useSelector(state => state.user.user);
    const listBlog = useSelector(state => state.profile.blogList);
    const [viewState, setViewState] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [savedBlogList, setSavedBlogList] = useState([]);
    const [savedPage, setSavedPage] = useState(1);
    const [hasMoreSaved, setHasMoreSaved] = useState(true);

    const t = useTranslations('Profile')

    const dispatch = useDispatch();

    const params = useParams()

    useEffect(() => {
        if (!window.location.hash) {
            setViewState('profile')
        } else if (window.location.hash === '#blog') {
            setViewState('blog')
        } else if (window.location.hash === '#saved') {
            setViewState('save')
        }
    }, [params]);

    // Hàm lấy dữ liệu blog
    const fetchBlogData = useCallback(async (pageNum) => {
        setLoading(true);
        try {
            const response = await getBlogsByUser(userData.email, pageNum);
            if (response) {
                if (pageNum === 1) {
                    dispatch(setListBlogProfile(response))
                    if (response.length < 10) {
                        setHasMore(false);
                    }
                } else {
                    dispatch(addBlogsProfile(response))
                    if (response.length < 10) {
                        setHasMore(false);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [userData?.email]);

    // Hàm lấy dữ liệu blog
    const fetchSaveBlogData = useCallback(async (pageNum) => {
        setLoading(true);
        const token = window.localStorage.getItem('token'); // Lấy token từ localStorage
        try {
            const response = await getSavedBlogsWithUser(token, pageNum); // Gọi API lấy blog đã lưu
            console.log(response);
            if (response) {
                const savedBlogs = response;

                if (pageNum === 1) {
                    setSavedBlogList(savedBlogs); // Gán dữ liệu cho danh sách blog đã lưu
                    if (savedBlogs.length < 10) {
                        setHasMoreSaved(false); // Dừng phân trang nếu số blog ít hơn giới hạn
                    }
                } else {
                    setSavedBlogList(prev => [...prev, ...savedBlogs]); // Thêm dữ liệu mới vào danh sách
                    if (savedBlogs.length < 10) {
                        setHasMoreSaved(false);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching saved blogs:", error);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        if (viewState === "blog" && hasMore) {
            fetchBlogData(page); // Gọi API lấy danh sách blog của người dùng
        } else if (viewState === "save" && hasMoreSaved) {
            fetchSaveBlogData(savedPage); // Gọi API lấy danh sách blog đã lưu
        }
    }, [fetchBlogData, fetchSaveBlogData, page, savedPage, hasMore, hasMoreSaved, viewState]);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop + windowHeight >= scrollHeight - 100 && !loading) {
            if (viewState === "blog" && hasMore) {
                setPage(prevPage => prevPage + 1);
            } else if (viewState === "save" && hasMoreSaved) {
                setSavedPage(prevPage => prevPage + 1);
            }
        }
    };


    useEffect(() => {
        if (loading) return;

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center max-w-[800px] pb-[50px]">
            <HeaderSelected id={userData?.page?.header?.id} props={userData} />
            <div className="flex gap-4 py-2">
                <div
                    className={`${viewState === "profile" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("profile")}
                >
                    {t('profile')}
                </div>
                <div
                    className={`${viewState === "blog" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("blog")}
                >
                    {t('blogs')}
                </div>
                <div
                    className={`${viewState === "save" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("save")}
                >
                    {t('saved')}
                </div>
            </div>

            {viewState && viewState === 'profile' && <div className="w-full">
                {!userData?.page?.body?.length <= 0 ? (userData?.page?.body.map((e, index) => (
                    <RenderComponent id={e.id} key={index} props={e.props} />
                ))) : (
                    <div className="w-full h-full mt-4">
                        <Image src={BACKGROUND_IMAGE} alt="default background" width={'100%'} height={'100%'} className="opacity-25" />
                    </div>
                )
                }
            </div>}

            {viewState && viewState === 'blog' && <div className="flex flex-col p-[10px] gap-[20px] w-full">
                {listBlog && listBlog.map((e) => {
                    return (
                        <div key={e.id} className="w-full">
                            <PostProfile data={e} />
                        </div>
                    );
                })}
                {!hasMore && (
                    <div className="text-center py-4 text-gray-500">

                    </div>
                )}
                {loading && (
                    <div className="text-center py-4">
                        <span className="loading loading-dots"></span>
                    </div>
                )}
            </div>}

            {viewState === 'save' && (
                <div className="flex flex-col p-[10px] gap-[20px] w-full">
                    {savedBlogList && savedBlogList.map((e) => (
                        <div key={e.id} className="w-full">
                            <PostSave data={e} />
                        </div>
                    ))}
                    {!hasMoreSaved && (
                        <div className="text-center py-4 text-gray-500">
                            {t('youHaveNoSavedBlog')}
                        </div>
                    )}
                    {loading && (
                        <div className="text-center py-4">
                            <span className="loading loading-dots"></span>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
