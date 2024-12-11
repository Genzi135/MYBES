'use client';

import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsExclamationTriangle, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { deleteComment } from '@/shared/commentAPI';
import { removeOneComment } from '@/hook/redux/features/commentSlice';
import { parseTimestamp } from '@/lib/helper';

export default function Comment({ data }) {
    const t = useTranslations('Post');
    const currentUser = useSelector((state) => state.user.user);
    const deleteModalRef = useRef(null);
    const reportModalRef = useRef(null);
    const dispatch = useDispatch();

    const [currentCommentId, setCurrentCommentId] = useState(null);

    const handleDeleteButtonClick = (id) => {
        setCurrentCommentId(id);
        if (deleteModalRef.current) {
            deleteModalRef.current.showModal();
        }
    };

    const handleDeleteConfirm = async () => {
        const token = window.localStorage.getItem('token');
        if (currentCommentId) {
            await deleteComment(currentCommentId, token)
            dispatch(removeOneComment(currentCommentId))
            toast.success(t('deleteSuccess'));
            if (deleteModalRef.current) {
                deleteModalRef.current.close();
            }
        }
    };

    const handleReportButtonClick = (id) => {
        setCurrentCommentId(id);
        if (reportModalRef.current) {
            reportModalRef.current.showModal();
        }
    };

    const handleReportConfirm = async () => {
        const token = window.localStorage.getItem('token');
        if (currentCommentId) {
            await reportComment(currentCommentId, token); // Gọi API report comment
            toast.success(t('reportSuccess'));
            if (reportModalRef.current) {
                reportModalRef.current.close();
            }
        }
    };

    const canDelete = currentUser?.email === data?.user?.email;

    return (
        <div className="w-full pl-4">
            <div className="flex flex-col border-b-[1px] pb-2 mb-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-[2px]">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-xl">
                                <img
                                    src={data?.user?.avatar_url || '/default-avatar.png'}
                                    alt="avatar"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="font-semibold">{data?.user?.name || t('anonymous')}</div>
                    </div>

                    {/* Dropdown */}
                    <div className="dropdown dropdown-end">
                        {currentUser && <div tabIndex={0} className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                            <BsThreeDotsVertical size={18} />
                        </div>}
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {canDelete && (
                                <li>
                                    <div
                                        onClick={() => handleDeleteButtonClick(data.id)}
                                        className="flex justify-start items-center gap-2 text-red-500 cursor-pointer"
                                    >
                                        <BsTrash size={20} />
                                        {t('delete')}
                                    </div>
                                </li>
                            )}
                            <li>
                                <div
                                    onClick={() => handleReportButtonClick(data.id)}
                                    className="flex justify-start items-center gap-2 text-yellow-500 cursor-pointer"
                                >
                                    <BsExclamationTriangle size={20} />
                                    {t('report')}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Content */}
                <div className='border-l-[6px] pl-2 my-2'>{data?.content}</div>
                <div className='text-gray-500 text-xs '>{parseTimestamp(data.create_at)}</div>
            </div>

            {/* Delete Modal */}
            <dialog ref={deleteModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t('areYouSure')}</h3>
                    <p className="py-4">{t('areYouSure')}</p>
                    <div className="modal-action gap-2">
                        <button className="btn btn-error" onClick={handleDeleteConfirm}>
                            {t('confirm')}
                        </button>
                        <button className="btn" onClick={() => deleteModalRef.current?.close()}>
                            {t('close')}
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Report Modal */}
            <dialog ref={reportModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t('areYouSure')}</h3>
                    <p className="py-4">{t('areYouSure')}</p>
                    <div className="modal-action gap-2">
                        <button className="btn btn-warning" onClick={handleReportConfirm}>
                            {t('confirm')}
                        </button>
                        <button className="btn" onClick={() => reportModalRef.current?.close()}>
                            {t('close')}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
