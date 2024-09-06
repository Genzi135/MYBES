import React, { useState } from 'react';
import { FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import { BsCode, BsImage, BsListOl, BsListUl, BsQuote, BsTypeH1, BsTypeH2, BsTypeH3, BsYoutube } from 'react-icons/bs';

const FloatingMenu = ({ editor }) => {

    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');  // Reset input
        }
    };

    const addYoutubeVideo = () => {
        if (videoUrl) {
            editor.commands.setYoutubeVideo({
                src: videoUrl,
                width: 640,
                height: 480,
            });
            setVideoUrl('');  // Reset input
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <TipTapFloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100, maxWidth: 'none' }}
            className="bg-white border border-gray-300 rounded-box shadow-lg p-2 flex space-x-2 mt-[50px]"
        >
            <div className="tooltip" data-tip="H1">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('heading', { level: 1 }) ? 'bg-black text-white' : ''}`}
                >
                    <BsTypeH1 className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="H2">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white' : ''}`}
                >
                    <BsTypeH2 className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="H3">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('heading', { level: 3 }) ? 'bg-black text-white' : ''}`}
                >
                    <BsTypeH3 className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="Bullet List">
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('bulletList') ? 'bg-black text-white' : ''}`}
                >
                    <BsListUl className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="Number List">
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('orderedList') ? 'bg-black text-white' : ''}`}
                >
                    <BsListOl className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="Quote">
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('blockquote') ? 'bg-black text-white' : ''}`}
                >
                    <BsQuote className="w-4 h-4" />
                </button>
            </div>
            <div className="tooltip" data-tip="Block Code">
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('codeBlock') ? 'bg-black text-white' : ''}`}
                >
                    <BsCode className="w-4 h-4" />
                </button>
            </div>
            {/* Dropdown Image */}
            <div className="dropdown dropdown-end tooltip" data-tip="Image">
                <label tabIndex={0} className="btn border bg-white btn-sm">
                    <BsImage className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box w-[300px] list-none">
                    <li className="mb-2">
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                        <button
                            onClick={addImage}
                            className="btn btn-sm btn-primary mt-2 w-full"
                        >
                            Add Image
                        </button>
                    </li>
                    <li>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageURL = URL.createObjectURL(file);
                                    editor.chain().focus().setImage({ src: imageURL }).run();
                                }
                            }}
                            className="file-input file-input-sm w-full"
                        />
                    </li>
                </ul>
            </div>

            {/* Dropdown YouTube Video */}
            <div className="dropdown dropdown-end tooltip" data-tip="Video">
                <label tabIndex={0} className="btn border bg-white btn-sm">
                    <BsYoutube className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content p-2 shadow bg-base-100 rounded-box w-[300px] list-none">
                    <li className="mb-2">
                        <input
                            type="text"
                            placeholder="Enter video URL"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="input input-bordered input-sm w-full"
                        />
                        <button
                            onClick={addYoutubeVideo}
                            className="btn btn-sm btn-primary mt-2 w-full"
                        >
                            Add Video
                        </button>
                    </li>
                </ul>
            </div>
        </TipTapFloatingMenu>
    );
};

export default FloatingMenu;
