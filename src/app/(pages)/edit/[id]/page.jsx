'use client'
import Navbar from "@/components/Navbar";
import { setCurrentBlog } from "@/hook/redux/features/blogSlice";
import { getBlogById } from "@/shared/blogAPI";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/Footer";
import EditPage from "./componet/EditPage";
import { toast } from "react-toastify";

export default function Edit() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const path = usePathname();

    const userData = useSelector((state) => state.user.user);

    const router = useRouter();

    const fetchBlogData = async () => {
        setLoading(true);
        try {
            const response = await getBlogById(path.replace("/edit/", ""));
            console.log(response);
            console.log(userData);
            if (response?.author?.email !== userData?.email) {
                toast.error('Error')
                router.push('/');
            } else
                setPostData(response)
        } catch (error) {
            console.error("Failed to fetch blog data:", error);
        } finally {
            setLoading(false); // Tắt loading sau khi fetch xong
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center relative">
            {loading && ( // Hiển thị loading khi đang fetch dữ liệu
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}
            <Navbar />
            {postData && (
                <EditPage data={postData} />
            )}
            <Footer />
        </div>
    );
}