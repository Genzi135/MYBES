'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteBlog, getBlogById, reportBlog, saveBlog, toggleComment } from "@/shared/blogAPI";
import { useDispatch, useSelector } from "react-redux";
import { removeOneBlog, setCurrentBlog, setSaveBlog } from "@/hook/redux/features/blogSlice";
import NotFoundPost from "./NotFoundPost";
import { BsBookmark, BsBookmarkFill, BsLink45Deg, BsPencilSquare, BsPersonSquare, BsShare, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { useTranslations } from "use-intl";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PostFullPage() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const path = usePathname();
    const dispatch = useDispatch();
    const currentBlogData = useSelector(state => state.blog.currentBlog);
    const userData = useSelector(state => state.user.user)
    const [inputReport, setInputReport] = useState('');

    const router = useRouter()

    const t = useTranslations('Post')

    const fetchBlogData = async () => {
        setLoading(true); // Bật loading trước khi fetch
        try {
            const response = await getBlogById(path.replace("/post/", ""));
            dispatch(setCurrentBlog(response));
        } catch (error) {
            console.error("Failed to fetch blog data:", error);
        } finally {
            setLoading(false); // Tắt loading sau khi fetch xong
        }
    };

    const handleDeleteButtonClick = () => {
        document.getElementById('modal_delete').showModal();
    };

    const handleDeleteConfirm = async () => {
        const token = window.localStorage.getItem('token');
        if (postData.id) {
            await deleteBlog(postData.id, token);
            toast.success(t('deleteSuccessfully'))
            router.push('/')
        }
    };

    const handleSaveBlog = async (id) => {
        const token = window.localStorage.getItem('token');
        if (id) {
            await saveBlog(id, token);
            // dispatch(setSaveBlog(currentBlogIdSelected))
        }
    }

    const handleCopyLink = (id) => {
        navigator.clipboard.writeText(window.location.origin + '/post/' + id).then(() => {
            console.log(id);
        })
        toast.success(t('copyLinkSuccess'))
    }

    const handleShareClick = (id) => {
        navigator.clipboard.writeText(window.location.origin + '/post/' + id)
        navigator.share({
            title: t('sharePost'),
            text: '',
            url: window.location.origin + '/post/' + id
        })
    }

    const handleEditButtonClick = (id) => {
        router.push('/edit/' + id)
    }

    const handleToggleComment = async () => {
        console.log("handle");
        try {
            const token = window.localStorage.getItem('token');
            const response = await toggleComment(token, postData.id)
            if (response) {
                console.log(response);
                dispatch(setCurrentBlog(response.data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleReport = async () => {
        const token = window.localStorage.getItem('token');
        if (postData.id) {
            await reportBlog(token, postData.id, inputReport);
            toast.success(t('reportSuccess'))
            setInputReport('');
        }
        document.getElementById('modal_report').close();
    }

    useEffect(() => {
        fetchBlogData();
    }, []);

    useEffect(() => {
        setPostData(currentBlogData);
    }, [currentBlogData]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center relative">
            {loading && ( // Hiển thị loading khi đang fetch dữ liệu
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
            )}
            <Navbar />
            {postData ? (
                <div className="flex flex-col justify-start items-start w-full max-w-[800px] mt-[20px]">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-center items-center gap-4 pr-4 rounded">
                            <div className="avatar">
                                <div tabIndex={0} role="button" className="w-14 h-14 rounded-full bg-gray-100">
                                    <img src={postData.author.avatar_url} width={20} height={20} alt="avatar" />
                                </div>
                            </div>
                            <div className="text-lg font-semibold">{postData?.author?.name}</div>

                        </div>
                        <div className="dropdown dropdown-left">
                            <div tabIndex={0} role="button">
                                <BsThreeDotsVertical size={22} className="p-[2px] hover:bg-gray-100 rounded-box" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li>
                                    <Link href={`/profile/${postData?.author?.email}`}><BsPersonSquare size={18} />{t('profile')}</Link>
                                </li>
                                <li>
                                    <div onClick={() => handleShareClick()}><BsShare size={18} />{t('share')}</div>
                                </li>
                                <li><div
                                    onClick={() => handleCopyLink(postData.id)}
                                    className="flex justify-start items-center gap2"><BsLink45Deg size={18} />{t('copyLink')}</div></li>
                                {/* {userData?.email && <li><div
                                    onClick={() => handleSaveBlog(postData.id)}
                                    className="flex justify-start items-center gap2">
                                    {postData && postData.isSave && postData.isSave ? <BsBookmarkFill size={18} /> : <BsBookmark size={18} />} {t('save')}</div></li>} */}
                                {userData?.email === postData.author.email && <li><div
                                    onClick={() => handleEditButtonClick(postData.id)}
                                    className="flex justify-start items-center gap2 "><BsPencilSquare size={18} />{t('edit')}</div></li>}
                                {userData?.email === postData.author.email && <li><div
                                    onClick={() => handleDeleteButtonClick()}
                                    className="flex justify-start items-center gap2 text-red-500"><BsTrash size={18} />{t('delete')}</div></li>}
                                {userData && <li>
                                    <div onClick={() => document.getElementById('modal_report').showModal()}>
                                        {t('report')}
                                    </div>
                                </li>}
                                {userData?.email === postData.author.email && !postData?.allowComment && <li>
                                    <div onClick={() => handleToggleComment()}>
                                        {t('blockComment')}
                                    </div>
                                </li>}
                                {userData?.email === postData.author.email && postData?.allowComment && <li>
                                    <div onClick={() => handleToggleComment()}>
                                        {t('allowComment')}
                                    </div>
                                </li>}

                            </ul>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                        <div className="text-4xl font-semibold mb-[12px] py-4">
                            {postData?.title}
                        </div>
                    </div>
                </div>
            ) : (<div className="h-full min-h-[80vh]">
                <NotFoundPost />
            </div>)}
            {postData && <PostPage data={postData} />}
            <Footer />


            <dialog id="modal_delete" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">!</h3>
                    <p className="py-4">{t('areYouSure')}</p>
                    <div className="modal-action gap-2">
                        <button className="btn btn-error" onClick={handleDeleteConfirm}>{t('confirm')}</button>
                        <button className="btn" onClick={() => document.getElementById('modal_delete').close()}>{t('close')}</button>
                    </div>
                </div>
            </dialog>

            <dialog id="modal_report" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Report</h3>
                    <p className="py-4">{t('inputContentReport')}</p>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={inputReport}
                        onChange={(e) => setInputReport(e.target.value)} // Corrected this line
                    />
                    <div className="modal-action gap-2">
                        <button className="btn btn-error" onClick={handleReport}>{t('confirm')}</button>
                        <button className="btn" onClick={() => document.getElementById('modal_report').close()}>{t('close')}</button>
                    </div>
                </div>
            </dialog>


        </div>
    );
}
