'use client';

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsArrowBarDown, BsStars } from "react-icons/bs";
import Link from "next/link";
import { AiGenerateImage, AiGenerateText } from "@/shared/chatBotAPI";

export default function ChatBot({ t }) {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenChatBox = () => setIsChatBoxOpen(!isChatBoxOpen);

    const handleSendTextMessage = async () => {
        if (!userInput.trim()) return;

        setMessages((prev) => [...prev, { type: 'user', text: userInput }]);
        setIsLoading(true);

        const botReply = await sendMessageToChatBot(userInput);
        setMessages((prev) => [...prev, { type: 'ai', text: botReply }]);
        setUserInput('');
        setIsLoading(false);
    };

    const handleSendImagePrompt = async () => {
        if (!userInput.trim()) return;

        setMessages((prev) => [...prev, { type: 'user', text: userInput }]);
        setIsLoading(true);

        const imageURL = await sendImagePromptToAPI(userInput);
        console.log(imageURL);
        setMessages((prev) => [...prev, { type: 'image', url: imageURL }]);
        setUserInput('');
        setIsLoading(false);
    };

    const sendMessageToChatBot = async (message) => {
        try {
            // const response = await fetch('/api/chatBot/chat', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ message }),
            // });

            // if (!response.ok) throw new Error('Failed to fetch reply from server');

            // const data = await response.json();
            // return data.message;

            const token = window.localStorage.getItem('token');
            const response = await AiGenerateText(message, token);
            console.log(response);
            if (response) {
                return response.message
            }
        } catch (error) {
            console.error(error);
            return 'Sorry, something went wrong.';
        }
    };

    const sendImagePromptToAPI = async (prompt) => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await AiGenerateImage(prompt, token);
            console.log(response);
            if (response) {
                return response.imageUrl
            }
        } catch (error) {
            console.error(error);
            return 'https://via.placeholder.com/150'; // Placeholder in case of an error
        }
    };

    return (
        <>
            <button
                className="buttonMain flex justify-center items-center p-[2px] gap-2 tooltip"
                data-tip="Chat bot AI"
                onClick={handleOpenChatBox}
            >
                AI <BsStars size={15} />
            </button>
            {isChatBoxOpen && (
                <div className="fixed bottom-4 right-4 w-[400px] bg-white shadow-lg rounded-lg overflow-hidden z-50 border">
                    <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
                        <span>Chat bot</span>
                        <button onClick={handleOpenChatBox} className="text-white">
                            <IoMdClose size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="p-4 max-h-[400px] min-h-[200px] overflow-y-auto">
                        {messages.map((msg, index) =>
                            msg.type === "image" ? (
                                <div key={index} className="p-2 mb-2">
                                    <img src={msg.url} alt="Generated content" className="w-full rounded" />
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className={`p-2 mb-2 rounded ${msg.type === 'user' ? 'bg-sky-200 text-right' : 'bg-gray-100 text-left'}`}
                                >
                                    {msg.text}
                                </div>
                            )
                        )}
                        {isLoading && (
                            <div className="w-full flex justify-center items-center mt-4">
                                <span className="loading loading-dots loading-sm"></span>
                            </div>
                        )}
                        {messages.length <= 0 && (
                            <div className="w-full flex flex-col justify-center items-center mt-10 gap-2 text-center">
                                <div>{t('PlsReadChatBotDocs')}</div>
                                <div>
                                    <BsArrowBarDown size={20} />
                                </div>
                                <Link href={'/mybes.html#chatBotAI'} className="hover:text-blue-500 hover:underline font-semibold">
                                    Chat bot AI
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Input Bar with Two Buttons */}
                    <div className="p-2 border-t flex flex-col items-center gap-2">
                        <input
                            type="text"
                            placeholder={t('TypeYourMessage')}
                            className="inputBar w-full"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div className="flex w-full justify-center items-center gap-2">
                            <button className="buttonMain w-full" onClick={handleSendTextMessage}>
                                {t('SendText')}
                            </button>
                            <button className="buttonMain w-full" onClick={handleSendImagePrompt}>
                                {t('SendImage')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
