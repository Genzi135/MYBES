'use client';

import ReviewComponent from '@/lib/renderHTMLfromJSON';
import { commentBlog, getComment } from '@/shared/commentAPI';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { BsSend, BsVolumeMuteFill, BsVolumeUp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { addComment, setListComment } from '@/hook/redux/features/commentSlice';

export default function PostPage({ data }) {
    const userData = useSelector((state) => state.user.user);
    const t = useTranslations('PostPage');
    const [inputComment, setInputComment] = useState('');
    const listComment = useSelector((state) => state.comment.commentList);
    const [comments, setComments] = useState([]);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [rate, setRate] = useState(1); // Tốc độ nói
    const [isSpeaking, setIsSpeaking] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const synth = window.speechSynthesis;

        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices.find((voice) => voice.lang === 'vi-VN') || availableVoices[0]);
            }
        };

        loadVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
    }, []);

    const handleCommentSend = async () => {
        const token = window.localStorage.getItem('token');
        if (inputComment) {
            const response = await commentBlog(data.id, token, inputComment);
            if (response) {
                dispatch(addComment(response));
                setInputComment('');
            }
        }
    };

    const handleGetComment = async () => {
        const token = window.localStorage.getItem('token');
        const response = await getComment(data.id, token);
        if (response) {
            dispatch(setListComment(response));
        }
    };

    useEffect(() => {
        handleGetComment();
    }, [data.id]);

    useEffect(() => {
        setComments(listComment);
    }, [listComment]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;

            if (isSpeaking) {
                synth.cancel();
                setIsSpeaking(false);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(data.contentTEXT);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            }
            utterance.rate = rate;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onend = () => setIsSpeaking(false);
            setIsSpeaking(true);
            synth.speak(utterance);
        } else {
            alert('Your browser does not support Text-to-Speech.');
        }
    };

    return (
        <div className="max-w-[800px] w-full min-h-[90vh] flex flex-col mb-[50px] px-2 sm:px-0 scroll-smooth">
            <div className="flex justify-between items-center mb-4 w-full">
                <div className="flex gap-4 justify-center items-center flex-wrap w-full">
                    <select
                        className="select select-sm select-bordered whitespace-nowrap text-ellipsis"
                        value={selectedVoice?.name || ''}
                        onChange={(e) => setSelectedVoice(voices.find((v) => v.name === e.target.value))}
                    >
                        {voices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                                🎤 {voice.name.length > 20
                                    ? `${voice.name.slice(0, 20)}...`
                                    : voice.name}
                                ({voice.lang})
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-center items-center gap-4">
                        <select
                            className="select select-sm select-bordered"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                        >
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                        <button
                            onClick={handleSpeak}
                            className="btn btn-sm"
                        >
                            {isSpeaking ? (
                                <BsVolumeMuteFill size={20} />
                            ) : (
                                <BsVolumeUp size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <ReviewComponent jsonContent={data.contentJSON} />

            {userData && !data?.allowComment && (
                <div className="w-full mt-20">
                    <div className="flex justify-center items-center gap-4 w-full mb-2">
                        {userData?.avatar_url && (
                            <div className="avatar">
                                <div className="w-10 h-10 rounded-lg">
                                    <img src={userData.avatar_url} width={40} height={40} alt="avatar" />
                                </div>
                            </div>
                        )}
                        <input
                            value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder={t('writeYourComment')}
                        />
                        <div
                            onClick={handleCommentSend}
                            className="rounded-full p-[9px] hover:bg-gray-200 cursor-pointer"
                        >
                            <BsSend size={20} />
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full flex flex-col gap-[2px]">
                <div id="comments" className="w-full border-b-[1px] my-10"></div>
                <div className="mb-2 text-lg font-semibold">{t('comments')}</div>
                {comments.length > 0 ? (
                    comments.map((e) => <Comment key={e.id} data={e} />)
                ) : (
                    <div className="flex justify-center items-center text-gray-500">
                        {t('noComment')}
                    </div>
                )}
            </div>
        </div>
    );
}
