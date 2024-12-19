'use client';

import { useTranslations } from 'next-intl';

export default function FooterEditor({ footerData, setFooterData }) {
    const t = useTranslations('ProfileSetting');

    const handleInputChange = (key, value) => {
        setFooterData({ ...footerData, [key]: value });
    };

    return (
        <div className="space-y-2">
            <label>
                <span>{t('Title')}</span>
                <input
                    type="text"
                    value={footerData.text}
                    onChange={(e) => handleInputChange('text', e.target.value)}
                    className="input input-bordered w-full"
                />
            </label>
            <label className='flex gap-2'>
                <span className='text-nowrap'>{t('TextColor')}</span>
                <input
                    type="color"
                    value={footerData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="input w-full h-8"
                />
            </label>
            <label className='flex gap-2'>
                <span className='text-nowrap'>{t('BackgroundColor')}</span>
                <input
                    type="color"
                    value={footerData.backgroundColor}
                    onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                    className="input w-full h-8"
                />
            </label>
            <label>
                <span>{t('FontSize')}</span>
                <input
                    type="number"
                    value={parseInt(footerData.size, 10)}
                    onChange={(e) => handleInputChange('size', `${e.target.value}px`)}
                    className="input input-bordered w-full"
                />
            </label>
            <label>
                <span>{t('Location')}</span>
                <input
                    type="text"
                    value={footerData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input input-bordered w-full"
                />
            </label>
            <label>
                <span>{t('Email')}</span>
                <input
                    type="email"
                    value={footerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input input-bordered w-full"
                />
            </label>
            <label>
                <span>{t('Phone')}</span>
                <input
                    type="tel"
                    value={footerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input input-bordered w-full"
                />
            </label>
            <label className="flex gap-2">
                <input
                    type="checkbox"
                    checked={footerData.bold}
                    onChange={(e) => handleInputChange('bold', e.target.checked)}
                    className="checkbox"
                />
                <span>{t('Bold')}</span>
            </label>
            <label className="flex gap-2">
                <input
                    type="checkbox"
                    checked={footerData.italic}
                    onChange={(e) => handleInputChange('italic', e.target.checked)}
                    className="checkbox"
                />
                <span>{t('Italic')}</span>
            </label>
            <label className="flex gap-2">
                <input
                    type="checkbox"
                    checked={footerData.underline}
                    onChange={(e) => handleInputChange('underline', e.target.checked)}
                    className="checkbox"
                />
                <span>{t('Underline')}</span>
            </label>
            <label>
                <span>{t('Height')}</span>
                <input
                    type="number"
                    value={parseInt(footerData.height, 10)}
                    onChange={(e) => handleInputChange('height', `${e.target.value}px`)}
                    className="input input-bordered w-full"
                />
            </label>
            <label>
                <span>{t('Layout')}</span>
                <select
                    value={footerData.layout}
                    onChange={(e) => handleInputChange('layout', e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="row">{t('Row')}</option>
                    <option value="column">{t('Column')}</option>
                </select>
            </label>
        </div>
    );
}
