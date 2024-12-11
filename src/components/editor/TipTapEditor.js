'use client';

import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Video from '@tiptap/extension-youtube';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';

import BubbleMenu from './BubbleMenu';
import FloatingMenu from './FloatingMenu';
import { useTranslations } from 'next-intl';
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from '@tiptap/extension-text-align';

const TiptapEditor = forwardRef(({ content }, ref) => {
    const t = useTranslations('Editor');

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageResize,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'image'],
            }),
            Underline,
            Strike,
            Heading.configure({ levels: [1, 2, 3] }),
            Color,
            BulletList,
            OrderedList,
            Blockquote,
            CodeBlock,
            Image,
            Video,
            FontFamily,
            TextStyle,
            BubbleMenuExtension,
            FloatingMenuExtension,
            Placeholder.configure({
                placeholder: t('placeholder') // Sử dụng bản dịch cho placeholder
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none'
            }
        },
    });

    // Expose the editor instance via ref
    useImperativeHandle(ref, () => ({
        getJSON: () => editor.getJSON(), // Hàm để lấy nội dung HTML từ editor
        clear: () => editor.commands.clearContent(),
        setContent: (content) => editor?.commands?.setContent(content),
        insertContent: (content) => editor?.commands?.insertContent(content)

    }));

    useEffect(() => {
        if (content) {
            editor?.commands?.setContent(content)
        }
    }, [editor])

    if (!editor) {
        return null;
    }

    return (
        <div className="relative mt-[20px]" suppressHydrationWarning>
            <EditorContent editor={editor} />
            <BubbleMenu editor={editor} t={t} /> {/* Truyền bản dịch xuống BubbleMenu */}
            <FloatingMenu editor={editor} t={t} /> {/* Truyền bản dịch xuống FloatingMenu */}
        </div>
    );
});

export default TiptapEditor;
