'use client';

import TiptapEditor from "@/components/editor/TipTapEditor";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import ReviewComponent from '@/lib/renderHTMLfromJSON';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { updateBlog } from "@/shared/blogAPI";
import { uploadMedia } from "@/shared/mediaAPI";
import ChatBot from "@/app/(pages)/write.html/components/ChatBot";

export default function EditPage({ data }) {
    const t = useTranslations('Write');
    const editorRef = useRef(null);  // Ref to editor component
    const fileInputRef = useRef(null);
    const [title, setTitle] = useState(data.title);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState(data.thumbnail || null);
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const [imageLoading, setImageLoading] = useState(false);
    const [dataChange, setDataChange] = useState(null);


    // Notify function for error or success messages
    const notify = (message, type = 'error') => {
        toast[type](message);
    };

    // Handle upload button click
    function handleUpload() {
        if (!title) {
            notify(t('Title cannot be empty'));
            return;
        }
        if (editorRef.current) {
            const content = editorRef.current.getJSON();
            if (!content.content || content.content.length === 0 || !content.content[0].content) {
                notify(t('Content cannot be empty'));
                return;
            }
            setDataChange(content)
            setIsReviewModalOpen(true);
        }
    }

    const handleNextClick = () => setCurrentStep(2);
    const handleBackClick = () => setCurrentStep(1);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addImage(file);
            fileInputRef.current.value = '';  // Reset file input
        }
    };

    const addImage = async (file) => {
        setImageLoading(true);
        try {
            const token = window.localStorage.getItem('token');
            const response = await uploadMedia(file, token);
            const uploadedImageUrl = response;
            if (uploadedImageUrl) {
                setThumbnail(uploadedImageUrl);
            }
        } catch (error) {
            console.error("Image upload failed", error);
        } finally {
            setImageLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = window.localStorage.getItem('token');
            console.log(token);
            const updatedData = {
                id: data.id,
                title: title,
                content: editorRef.current.getJSON(),
                thumbnail: thumbnail || null,
            };
            await updateBlog(updatedData, token);
            setIsReviewModalOpen(false);
            notify(t('Blog updated successfully'), 'success');
            router.push(`/post/${data.id}`);
        } catch (error) {
            console.error("Failed to update blog", error);
        }
    };

    return (
        <div className="max-w-[800px] w-full min-h-[90vh] flex flex-col mb-[50px] relative sm:p-0 p-3">
            <ToastContainer />

            <div className="flex justify-between items-center mt-[20px] mb-[10px] gap-10">
                <input
                    type="text"
                    className="w-full py-[10px] focus:outline-none border-b-[1px] font-semibold text-xl"
                    placeholder={t('title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex justify-center items-center gap-4">
                    <div data-tip="Chat bot AI">
                        <ChatBot t={t} />
                    </div>
                    <button
                        className="buttonMain tooltip"
                        data-tip={t('Upload')}
                        onClick={handleUpload}
                    >
                        {t('Upload')}
                    </button>
                </div>
            </div>

            {/* Conditional rendering of TipTapEditor */}

            <TiptapEditor ref={editorRef} content={data.contentJSON} />


            {/* Modal for Review */}
            {isReviewModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-[800px]">
                        {currentStep === 1 ? (
                            <>
                                <h2 className="font-bold text-lg">{t('Review Your Post')}</h2>
                                <div className="flex w-full justify-center items-center p-[20px]">
                                    <p className="text-2xl font-semibold">{title}</p>
                                </div>
                                {dataChange ? <ReviewComponent jsonContent={dataChange} /> : ''}
                                <div className="modal-action">
                                    <button className="btn" onClick={() => setIsReviewModalOpen(false)}>{t('Close')}</button>
                                    <button className="btn" onClick={handleNextClick}>{t('Next')}</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="font-bold text-lg">{t('Step 2: Add Thumbnail and Description')}</h2>
                                {thumbnail && (
                                    <div className="flex flex-col items-center mb-4">
                                        <Image src={thumbnail} alt="Thumbnail Preview" className="object-cover rounded" width={250} height={170} />
                                    </div>
                                )}
                                <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-4">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="file-input file-input-bordered"
                                        ref={fileInputRef}
                                    />
                                    <div className="modal-action">
                                        <button className="btn" onClick={handleBackClick}>{t('Back')}</button>
                                        {imageLoading ? <button className="loading loading-dots"></button> : <button type="submit" className="btn">{t('Upload')}</button>}
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
