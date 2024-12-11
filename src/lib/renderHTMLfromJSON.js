import { generateHTML } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
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
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import ImageResize from 'tiptap-extension-resize-image';

export const renderJSONToHTML = (jsonContent) => {
    return generateHTML(jsonContent, [
        StarterKit,
        Document,
        Paragraph,
        ImageResize,
        TextAlign.configure({
            types: ['heading', 'paragraph', 'image'],
        }),
        Text,
        Link,
        Underline,
        Strike,
        Heading,
        BulletList,
        OrderedList,
        Blockquote,
        CodeBlock,
        Image,
        Video,
        TextStyle,
        FontFamily,
        Color,
        BubbleMenuExtension,
        FloatingMenuExtension,
        Placeholder,
        ListItem
    ]);
};

const PreviewComponent = ({ jsonContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: renderJSONToHTML(jsonContent) }} />
    );
};

export default PreviewComponent;
