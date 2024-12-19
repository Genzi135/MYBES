'use client';

import { useTranslations } from 'next-intl';

export default function HeaderEditor({ headerData, setHeaderData }) {
    const t = useTranslations('ProfileSetting');

    const fontFamilies = [
        { label: t('Default'), value: null },
        { label: 'Inter', value: 'Inter' },
        { label: 'Comic Sans', value: 'Comic Sans MS' },
        { label: 'Monospace', value: 'monospace' },
        { label: 'Cursive', value: 'cursive' },
    ];

    const handleHeaderChange = (field, value) => {
        setHeaderData({ ...headerData, [field]: value });
    };

    return (
        <>
            <label>
                <span>{t('Title')}</span>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={headerData.title}
                    onChange={(e) => handleHeaderChange('title', e.target.value)}
                />
            </label>
            <label className="flex gap-2">
                <span className="flex text-nowrap">{t('TextColor')}</span>
                <input
                    type="color"
                    className="input w-full h-8"
                    value={headerData.color}
                    onChange={(e) => handleHeaderChange('color', e.target.value)}
                />
            </label>
            <label className="flex gap-2">
                <span className="flex text-nowrap">{t('BackgroundColor')}</span>
                <input
                    type="color"
                    className="input w-full h-8"
                    value={headerData.backgroundColor}
                    onChange={(e) => handleHeaderChange('backgroundColor', e.target.value)}
                />
            </label>
            <label>
                <span>{t('Font')}</span>
                <select
                    className="select select-bordered w-full"
                    value={headerData.font}
                    onChange={(e) => handleHeaderChange('font', e.target.value)}
                >
                    {fontFamilies.map((font) => (
                        <option key={font.value} value={font.value}>
                            {font.label}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <span>{t('TextAlign')}</span>
                <select
                    className="select select-bordered w-full"
                    value={headerData.textAlign}
                    onChange={(e) => handleHeaderChange('textAlign', e.target.value)}
                >
                    <option value="left">{t('Left')}</option>
                    <option value="center">{t('Center')}</option>
                    <option value="right">{t('Right')}</option>
                </select>
            </label>
            <div className="flex flex-col gap-2">
                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={headerData.bold}
                        onChange={(e) => handleHeaderChange('bold', e.target.checked)}
                    />
                    <span>{t('Bold')}</span>
                </label>
                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={headerData.italic}
                        onChange={(e) => handleHeaderChange('italic', e.target.checked)}
                    />
                    <span>{t('Italic')}</span>
                </label>
                <label className="flex gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={headerData.underline}
                        onChange={(e) => handleHeaderChange('underline', e.target.checked)}
                    />
                    <span>{t('Underline')}</span>
                </label>
            </div>
            <label>
                <span>{t('FontSize')}</span>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={parseInt(headerData.size, 10)}
                    onChange={(e) => handleHeaderChange('size', `${e.target.value}px`)}
                />
            </label>
            <label>
                <span>{t('Height')}</span>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={parseInt(headerData.height, 10)}
                    onChange={(e) => handleHeaderChange('height', `${e.target.value}px`)}
                />
            </label>
            <label className="flex gap-2">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={headerData.shadow}
                    onChange={(e) => handleHeaderChange('shadow', e.target.checked)}
                />
                <span>{t('Enable Shadow')}</span>
            </label>
            <label>
                <span>{t('PaddingLeft')}</span>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={parseInt(headerData.paddingLeft, 10)}
                    onChange={(e) => handleHeaderChange('paddingLeft', `${e.target.value}px`)}
                />
            </label>
            <label>
                <span>{t('PaddingRight')}</span>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={parseInt(headerData.paddingRight, 10)}
                    onChange={(e) => handleHeaderChange('paddingRight', `${e.target.value}px`)}
                />
            </label>
        </>
    );
}
