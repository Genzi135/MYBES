'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { searchBlog } from "@/shared/blogAPI";
import { searchUsers } from "@/shared/userAPI";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Post from "@/components/post/Post";
import { useTranslations } from "next-intl";

export default function Search() {
    const [viewState, setViewState] = useState("blogs");
    const [blogDataSource, setBlogDataSource] = useState([]);
    const [userDataSource, setUserDataSource] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const t = useTranslations('Search')

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryFromNavbar = searchParams.get("query");


    useEffect(() => {
        if (queryFromNavbar) {
            setSearchQuery(queryFromNavbar);
        }
    }, [queryFromNavbar]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    useEffect(() => {
        const fetchBlogData = async () => {
            if (debouncedQuery.trim() === "") {
                setBlogDataSource([]);
                return;
            }

            try {
                const response = await searchBlog(debouncedQuery);
                setBlogDataSource(response || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        if (viewState === "blogs" && debouncedQuery) fetchBlogData();
    }, [viewState, debouncedQuery]);


    useEffect(() => {
        const fetchUserData = async () => {
            if (debouncedQuery.trim() === "") {
                setUserDataSource([]);
                return;
            }

            try {
                const response = await searchUsers(debouncedQuery);
                setUserDataSource(response || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        if (viewState === "users" && debouncedQuery) fetchUserData();
    }, [viewState, debouncedQuery]);

    // Lựa chọn DataSource dựa vào viewState
    const currentDataSource = viewState === "blogs" ? blogDataSource : userDataSource;

    // Xử lý sự kiện khi nhấn Enter hoặc click vào nút Search
    const handleSearch = () => {
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <Navbar />
            <div className="flex flex-col w-full max-w-[800px] min-h-[85vh] mt-5 mb-10 p-4">
                {/* Input Search */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    <button
                        onClick={handleSearch}
                        className="buttonMain"
                    >
                        {t('search')}
                    </button>
                </div>

                {/* Toggle giữa Blogs và Users */}
                <div className="flex pb-4 gap-4 border-b">
                    <div
                        className={`cursor-pointer p-2 ${viewState === "blogs" ? "border-b-2 border-black font-semibold" : "text-gray-500"
                            }`}
                        onClick={() => setViewState("blogs")}
                    >
                        Blogs
                    </div>
                    <div
                        className={`cursor-pointer p-2 ${viewState === "users" ? "border-b-2 border-black font-semibold" : "text-gray-500"
                            }`}
                        onClick={() => setViewState("users")}
                    >
                        {t('User')}
                    </div>
                </div>

                {/* Hiển thị kết quả */}
                <div className="mt-4">
                    {currentDataSource.length > 0 ? (
                        <div className="space-y-4">
                            {currentDataSource.map((item) =>
                                viewState === "blogs" ? (
                                    <div className="w-full" key={item.id}>
                                        <Post data={item} />
                                    </div>
                                ) : (
                                    <div key={item.email} className="border p-4 rounded-md">
                                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => { router.push('/profile/' + item.email) }}>
                                            <img
                                                src={item.avatar_url || "/placeholder-avatar.png"}
                                                alt="avatar"
                                                className="w-12 h-12 rounded-md"
                                            />
                                            <div>
                                                <h3 className="font-bold">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            {searchQuery
                                ? `${t('no')} ${viewState === "blogs" ? "blogs" : t('user')} ${t('notFoundFor')} "${searchQuery}"`
                                : t('startingToSearch')}
                        </p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
