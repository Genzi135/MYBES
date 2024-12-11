import React, { useState } from 'react';
import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaLink, FaFont, FaPalette, FaEllipsisH, FaAlignJustify, FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa';

const BubbleMenu = ({ editor, t }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    if (!editor) {
        return null;
    }

    const fontFamilies = [
        { label: t('Default'), value: null },
        { label: 'Inter', value: 'Inter' },
        { label: 'Comic Sans', value: 'Comic Sans MS' },
        { label: 'Serif', value: 'serif' },
        { label: 'Monospace', value: 'monospace' },
        { label: 'Cursive', value: 'cursive' },
        { label: 'Comic Sans quoted', value: '"Comic Sans MS", cursive, sans-serif' },
    ];

    const colors = [
        { name: t('Orange'), code: '#FBBC88' },
        { name: t('Yellow'), code: '#FAF594' },
        { name: t('Blue'), code: '#70CFF8' },
        { name: t('Green'), code: '#6BCB77' },
        { name: t('Red'), code: '#FF6B6B' },
        { name: t('Purple'), code: '#6C5B7B' },
    ];

    const handleColorChange = (event) => {
        const color = event.target.value;
        editor.chain().focus().setColor(color).run();
    };

    return (
        <TipTapBubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100, maxWidth: 'none' }}
            className="bg-white border flex flex-wrap border-gray-300 rounded-box shadow-lg p-2 gap-2 space-x-2 w-auto"
        >
            {/* Text formatting buttons */}
            <div className="tooltip" data-tip={t('Bold (Ctrl+B)')}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('bold') ? 'bg-black text-white' : ''}`}
                >
                    <FaBold />
                </button>
            </div>
            <div className="tooltip" data-tip={t('Italic (Ctrl+I)')}>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('italic') ? 'bg-black text-white' : ''}`}
                >
                    <FaItalic />
                </button>
            </div>
            <div className="tooltip" data-tip={t('Underline (Ctrl+U)')}>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('underline') ? 'bg-black text-white' : ''}`}
                >
                    <FaUnderline />
                </button>
            </div>
            <div className="tooltip" data-tip={t('Strikethrough (Ctrl+Shift+S)')}>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`btn border bg-white btn-sm ${editor.isActive('strike') ? 'bg-black text-white' : ''}`}
                >
                    <FaStrikethrough />
                </button>
            </div>

            <div className="tooltip" data-tip={t('Align')}>
                <div className='dropdown dropdown-hover'>
                    <label tabIndex={0} className="btn border btn-sm flex items-center space-x-2 bg-white">
                        <FaAlignJustify />
                        {/* <span>{t('Font')}</span> */}
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                        <li>
                            <a
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                className='flex gap-2 justify-start items-center'>
                                <FaAlignCenter />
                                {t('center')}
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                className='flex gap-2 justify-start items-center'>
                                <FaAlignRight />
                                {t('left')}
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                className='flex gap-2 justify-start items-center'>
                                <FaAlignLeft />
                                {t('right')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Font family dropdown */}
            <div className="tooltip" data-tip={t('Font')}>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn border btn-sm flex items-center space-x-2 bg-white">
                        <FaFont />
                        {/* <span>{t('Font')}</span> */}
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                        {fontFamilies.map((font) => (
                            <li key={font.label}>
                                <a
                                    onClick={() => editor.chain().focus().setFontFamily(font.value).run()}
                                    className={editor.getAttributes('textStyle').fontFamily === font.value ? 'bg-black text-white' : ''}
                                >
                                    {font.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* More options dropdown */}
            <div className="tooltip" data-tip={t('More options')}>
                <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn border btn-sm flex items-center space-x-2 bg-white">
                        <FaEllipsisH />
                        {/* <span>{t('More options')}</span> */}
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                        <li><a onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleBulletList().run()}>{t('Bullet List')}</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleOrderedList().run()}>{t('Number List')}</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleBlockquote().run()}>{t('Quote')}</a></li>
                        <li><a onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{t('Block Code')}</a></li>
                    </ul>
                </div>
            </div>

            {/* Color picker */}
            <div className="tooltip" data-tip={t('Text color')}>
                <div className="dropdown dropdown-hover">
                    <button
                        tabIndex={0}
                        className="btn border btn-sm flex items-center space-x-2 bg-white"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    >
                        <FaPalette />
                        {/* <span>{t('Color')}</span> */}
                    </button>
                    {showColorPicker && (
                        <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 absolute">
                            {colors.map((color) => (
                                <li key={color.name} className="flex items-center space-x-2">
                                    <button
                                        onClick={() => editor.chain().focus().setColor(color.code).run()}
                                        className="w-full text-left flex items-center space-x-2"
                                    >
                                        <span
                                            className="block w-4 h-4 rounded-full"
                                            style={{ backgroundColor: color.code }}
                                        />
                                        <span>{color.name}</span>
                                    </button>
                                </li>
                            ))}
                            {/* Custom color input */}
                            <li>
                                <div className="flex items-center gap-2 hover:bg-none">
                                    <div>{t('Custom')}:</div>
                                    <input
                                        title={t('Choose color')}
                                        type="color"
                                        onChange={handleColorChange}
                                        className="w-full box-content cursor-pointer"
                                    />
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {/* Insert link */}
            <div className="tooltip" data-tip={t('Insert link (Ctrl+K)')}>
                <button
                    onClick={() => editor.chain().focus().setLink({ href: prompt(t('Enter URL')) }).run()}
                    className={`btn border bg-white btn-sm text-black ${editor.getAttributes('link') ? '' : ''}`}
                >
                    <FaLink />
                </button>
            </div>
        </TipTapBubbleMenu>
    );
};

export default BubbleMenu;
