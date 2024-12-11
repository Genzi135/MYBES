'use client'
import { removeOneBlog, setSaveBlog } from "@/hook/redux/features/blogSlice";
import { parseTimestamp } from "@/lib/helper";
import { deleteBlog, saveBlog } from "@/shared/blogAPI";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsChat, BsLink45Deg, BsPencilSquare, BsShare, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Post({ data }) {
    const t = useTranslations('Post');
    const userData = useSelector(state => state.user.user);
    const [currentBlogIdSelected, setCurrentBlogId] = useState(data.id);
    const dispatch = useDispatch();
    const deleteModalRef = useRef(null);
    const router = useRouter();

    const handleDeleteButtonClick = (id) => {
        setCurrentBlogId(id);
        if (deleteModalRef.current) {
            deleteModalRef.current.showModal();
        }
    };

    const handleDeleteConfirm = async () => {
        const token = window.localStorage.getItem('token');
        if (currentBlogIdSelected) {
            await deleteBlog(currentBlogIdSelected, token);
            toast.success(t('deleteSuccessfully'))
            dispatch(removeOneBlog(currentBlogIdSelected))

            if (deleteModalRef.current) {
                deleteModalRef.current.close();
            }
        }
    };

    const handleSaveBlog = async () => {
        const token = window.localStorage.getItem('token');
        if (currentBlogIdSelected) {
            await saveBlog(currentBlogIdSelected, token);
            dispatch(setSaveBlog(currentBlogIdSelected))
            toast.success(t('save'))
        }
    }

    const handleCopyLink = (id) => {
        navigator.clipboard.writeText(window.location.origin + '/post/' + id).then(() => {
            toast.success(t('copyLinkSuccess'))
        })
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

    return (
        <div className="w-full border p-[20px] rounded-box">
            <div className="flex justify-between items-center w-full">
                <div onClick={() => { router.push('/profile/' + data.author.email) }}
                    className="flex  p-[2px] pr-2 rounded-[5px] justify-start items-center gap-2 mb-[16px] hover:cursor-pointer tooltip" data-tip={t('goToProfile')}>
                    <div className="avatar">
                        <div tabIndex={0} role="button" className="w-10 h-10 rounded-full bg-gray-200">
                            <img src={data.author.avatar_url} width={20} height={20} alt="avatar" />
                        </div>
                    </div>
                    <div className="text-base">{data.author?.name}</div>
                </div>
                <div className="text-gray-400 text-nowrap text-sm">
                    {data.create_at && parseTimestamp(data.create_at)}
                </div>
            </div>
            <div className="text-xl font-semibold mb-[12px]">
                <Link href={`/post/${data.id}`}>{data.title}</Link>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-start w-full min-h-full  text-gray-400">
                <div className="w-full text-7-line mr-[20px]">
                    <Link href={`/post/${data.id}`}>{data.content}</Link>
                </div>
                {data.thumbnail &&
                    <div className="w-full rounded-box flex justify-center items-center h-full">
                        <Image src={data.thumbnail} alt="thumbnail" width={250} height={170} className="rounded-box w-full sm:w-[250px] max-h-[170px]" />
                    </div>
                }
            </div>
            <div className="flex justify-between items-center mt-[20px]">
                <div className="flex justify-start items-center gap-6 ">
                    <a href={`/post/${data.id}#comments`}>
                        <div className="flex gap-2 justify-center items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded-lg tooltip" data-tip={t('comment')}>
                            <BsChat size={18} />
                            {t('comment')}
                        </div>
                    </a>
                    <div
                        onClick={() => handleShareClick(data.id)}
                        className="rounded-full hover:bg-gray-100 cursor-pointer p-[6px] tooltip" data-tip={t('share')}>
                        <BsShare size={18} />
                    </div>
                </div>
                <div className="dropdown dropdown-top dropdown-left">
                    <div tabIndex={0} role="button">
                        <BsThreeDotsVertical size={22} className="p-[2px] hover:bg-gray-100 rounded-box" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><div
                            onClick={() => handleCopyLink(data.id)}
                            className="flex justify-start items-center gap2"><BsLink45Deg size={18} />{t('copyLink')}</div></li>
                        {userData?.email && <li><div
                            onClick={() => handleSaveBlog(data.id)}
                            className="flex justify-start items-center gap2">
                            {data && data.isSave && data.isSave ? <BsBookmarkFill size={18} /> : <BsBookmark size={18} />} {t('save')}</div></li>}
                        {userData?.email === data.author.email && <li><div
                            onClick={() => handleEditButtonClick(data.id)}
                            className="flex justify-start items-center gap2 "><BsPencilSquare size={18} />{t('edit')}</div></li>}
                        {userData?.email === data.author.email && <li><div
                            onClick={() => handleDeleteButtonClick(data.id)}
                            className="flex justify-start items-center gap2 text-red-500"><BsTrash size={18} />{t('delete')}</div></li>}
                        {/* {userData?.email && <li><div className="flex justify-start items-center gap2 "><BsExclamationTriangle size={18} />{t('report')}</div></li>} */}
                    </ul>
                </div>
            </div>

            <dialog ref={deleteModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">!</h3>
                    <p className="py-4">{t('areYouSure')}</p>
                    <div className="modal-action gap-2">
                        <button className="btn btn-error" onClick={handleDeleteConfirm}>{t('confirm')}</button>
                        <button className="btn" onClick={() => deleteModalRef.current?.close()}>{t('close')}</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
