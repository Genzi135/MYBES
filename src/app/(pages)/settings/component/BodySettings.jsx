import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTranslations } from 'next-intl';

const DraggableItem = ({
    id,
    type,
    content,
    removeComponent,
    alignment,
    setAlignment,
    fontStyle,
    setFontStyle,
    fontSize,
    setFontSize,
    imageWidth,
    setImageWidth,
    imageHeight,
    setImageHeight
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        textAlign: alignment, // Alignment for content
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="flex justify-between items-center">
                <span>{type === 'title' ? 'Title' : type === 'paragraph' ? 'Paragraph' : 'Image'}</span>
                <button onClick={() => removeComponent(id)} style={{ color: 'red' }}>
                    Delete
                </button>
            </div>

            <div className="mt-2">
                {/* Content alignment options */}
                <div>
                    <button onClick={() => setAlignment('left')} className={alignment === 'left' ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                        Left
                    </button>
                    <button onClick={() => setAlignment('center')} className={alignment === 'center' ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                        Center
                    </button>
                    <button onClick={() => setAlignment('right')} className={alignment === 'right' ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                        Right
                    </button>
                </div>

                {/* Font Style adjustments for title */}
                {type === 'title' && (
                    <div>
                        <button onClick={() => setFontStyle({ ...fontStyle, bold: !fontStyle.bold })} className={fontStyle.bold ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Bold
                        </button>
                        <button onClick={() => setFontStyle({ ...fontStyle, italic: !fontStyle.italic })} className={fontStyle.italic ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Italic
                        </button>
                        <button onClick={() => setFontStyle({ ...fontStyle, underline: !fontStyle.underline })} className={fontStyle.underline ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Underline
                        </button>

                        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="select select-bordered select-sm">
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                            <option value="24px">24px</option>
                        </select>
                    </div>
                )}

                {/* Font Style adjustments for paragraph */}
                {type === 'paragraph' && (
                    <div>
                        <button onClick={() => setFontStyle({ ...fontStyle, bold: !fontStyle.bold })} className={fontStyle.bold ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Bold
                        </button>
                        <button onClick={() => setFontStyle({ ...fontStyle, italic: !fontStyle.italic })} className={fontStyle.italic ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Italic
                        </button>
                        <button onClick={() => setFontStyle({ ...fontStyle, underline: !fontStyle.underline })} className={fontStyle.underline ? 'btn btn-sm btn-active' : 'btn btn-sm'}>
                            Underline
                        </button>
                    </div>
                )}

                {/* Image Width and Height adjustments */}
                {type === 'image' && (
                    <div>
                        <label>Width</label>
                        <input
                            type="number"
                            value={imageWidth}
                            onChange={(e) => setImageWidth(e.target.value)}
                            className="input input-bordered input-sm"
                        />
                        <label>Height</label>
                        <input
                            type="number"
                            value={imageHeight}
                            onChange={(e) => setImageHeight(e.target.value)}
                            className="input input-bordered input-sm"
                        />
                    </div>
                )}
            </div>

            <div className="mt-2">
                {type === 'title' && (
                    <h3
                        style={{
                            fontWeight: fontStyle.bold ? 'bold' : 'normal',
                            fontStyle: fontStyle.italic ? 'italic' : 'normal',
                            textDecoration: fontStyle.underline ? 'underline' : 'none',
                            fontSize: fontSize,
                        }}
                    >
                        {content}
                    </h3>
                )}
                {type === 'paragraph' && (
                    <p
                        style={{
                            fontWeight: fontStyle.bold ? 'bold' : 'normal',
                            fontStyle: fontStyle.italic ? 'italic' : 'normal',
                            textDecoration: fontStyle.underline ? 'underline' : 'none',
                        }}
                    >
                        {content}
                    </p>
                )}
                {type === 'image' && <img src={content} alt="Image" style={{ width: imageWidth, height: imageHeight }} />}
            </div>
        </div>
    );
};

export default function BodyEditor({ bodyData, setBodyData }) {
    const t = useTranslations('ProfileSetting');
    const [newComponentType, setNewComponentType] = useState('title');
    const [newComponentContent, setNewComponentContent] = useState('');
    const [alignment, setAlignment] = useState('left');
    const [fontStyle, setFontStyle] = useState({ bold: false, italic: false, underline: false });
    const [fontSize, setFontSize] = useState('16px');
    const [imageWidth, setImageWidth] = useState(400);
    const [imageHeight, setImageHeight] = useState(300);

    const addComponent = () => {
        if (!newComponentContent.trim()) return;

        setBodyData([
            ...bodyData,
            {
                id: `${Date.now()}-${Math.random()}`,
                type: newComponentType,
                content: newComponentContent,
                alignment,
                fontStyle,
                fontSize,
                imageWidth,
                imageHeight,
            },
        ]);
        setNewComponentContent('');
    };

    const removeComponent = (id) => {
        setBodyData(bodyData.filter((component) => component.id !== id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = bodyData.findIndex((item) => item.id === active.id);
            const newIndex = bodyData.findIndex((item) => item.id === over?.id);

            const updatedBodyData = arrayMove(bodyData, oldIndex, newIndex);
            setBodyData(updatedBodyData);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label>{t('ComponentType')}</label>
                <select
                    value={newComponentType}
                    onChange={(e) => setNewComponentType(e.target.value)}
                    className="select select-bordered w-full mb-2"
                >
                    <option value="title">Title</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="image">Image</option>
                </select>

                <label>{t('ComponentContent')}</label>
                <input
                    type="text"
                    value={newComponentContent}
                    onChange={(e) => setNewComponentContent(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder={
                        newComponentType === 'image'
                            ? 'Enter image URL'
                            : 'Enter content'
                    }
                />

                <button onClick={addComponent} className="btn btn-primary mt-2">
                    {t('AddComponent')}
                </button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={bodyData.map((component) => component.id)} strategy={verticalListSortingStrategy}>
                    {bodyData.map((component) => (
                        <DraggableItem
                            key={component.id}
                            {...component}
                            removeComponent={removeComponent}
                            alignment={component.alignment}
                            setAlignment={setAlignment}
                            fontStyle={component.fontStyle}
                            setFontStyle={setFontStyle}
                            fontSize={component.fontSize}
                            setFontSize={setFontSize}
                            imageWidth={component.imageWidth}
                            setImageWidth={setImageWidth}
                            imageHeight={component.imageHeight}
                            setImageHeight={setImageHeight}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
