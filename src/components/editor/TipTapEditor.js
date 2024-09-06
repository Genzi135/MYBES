// components/TiptapEditor.jsx
'use client'
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style'
import Video from '@tiptap/extension-youtube';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';

import BubbleMenu from './BubbleMenu';
import FloatingMenu from './FloatingMenu';
import Placeholder from '@tiptap/extension-placeholder';

const TiptapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            // TextStyle,
            Link,
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
                placeholder: '...'
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none'
            }
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="relative mt-[20px]" suppressHydrationWarning>
            <EditorContent editor={editor} />
            <BubbleMenu editor={editor} />
            <FloatingMenu editor={editor} />
        </div>
    );
};

export default TiptapEditor;
