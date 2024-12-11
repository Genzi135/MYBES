'use client';

import { useTranslations } from 'use-intl';
import Post from '../post/Post';
import { useCallback, useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, getBlogsWithUser } from '@/shared/blogAPI';
import { addBlogs, setListBlog } from '@/hook/redux/features/blogSlice';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const dispatch = useDispatch();
    const [viewState, setViewState] = useState('new');
    const blogList = useSelector((state) => state.blog.blogList);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [noMoreBlogs, setNoMoreBlogs] = useState(false);
    const userData = useSelector((state) => state.user.user);

    const fetchBlogData = useCallback(
        async (pageNum) => {
            setLoading(true);
            try {
                const token = window.localStorage.getItem('token');
                const data = userData
                    ? await getBlogsWithUser(token, pageNum)
                    : await getBlogs(token, pageNum);

                if (pageNum === 1) {
                    dispatch(setListBlog(data));
                } else {
                    dispatch(addBlogs(data));
                }

                // Nếu số lượng bài viết trả về < 10, ngừng tải thêm
                if (data.length < 10) {
                    setNoMoreBlogs(true);
                    setPage(0); // Ngăn không cho gọi thêm API
                }
            } finally {
                setLoading(false);
            }
        },
        [userData, dispatch]
    );

    // Gọi fetchBlogData khi page thay đổi
    useEffect(() => {
        if (page > 0) {
            fetchBlogData(page);
        }
    }, [fetchBlogData, page]);

    // Kiểm tra khi cuộn xuống cuối trang
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollTop + windowHeight >= scrollHeight - 100 && !loading && page > 0) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Đăng ký sự kiện cuộn
    useEffect(() => {
        if (noMoreBlogs) return; // Ngừng gắn listener nếu không còn bài viết
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, noMoreBlogs]);

    return (
        <div className="flex justify-center items-start min-h-[90vh] w-full max-w-[1000px]">
            <div className="flex flex-col w-full max-w-[800px]">
                <div className="flex pt-[10px] pb-[10px] gap-2">
                    <div
                        className={`${viewState === 'new'
                            ? 'cursor-default border-b border-black'
                            : 'text-[#A9A9A9] cursor-pointer border-0'
                            } p-[10px] flex gap-2`}
                        onClick={() => setViewState('new')}
                    >
                        <BsStars size={20} />
                        {t('new')}
                    </div>
                </div>
                <div className="flex flex-col p-[10px] gap-[20px]">
                    {blogList && blogList.map((e) => <Post key={e.id} data={e} />)}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-5">
                        <span className='loading loading-dots'></span>
                    </div>
                )}
                {noMoreBlogs && (
                    <div className="flex justify-center items-center py-5 text-gray-500">
                        {t('noMoreBlogs')} {/* Hiển thị thông báo không còn bài viết */}
                    </div>
                )}
            </div>
        </div>
    );
}
