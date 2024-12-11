'use client';

import { setUser } from '@/hook/redux/features/userSlice';
import { updatePage } from '@/shared/userAPI';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listUI } from './ListUI';
import { useTranslations } from 'next-intl';

export default function FormInput({ id }) {
    const [component, setComponent] = useState(id);
    const t = useTranslations('Form');

    useEffect(() => {
        if (id) {
            const findComponent = listUI.find((e) => e.id === id.id);
            setComponent(findComponent);
        }
    }, [id]);

    const dispatch = useDispatch();
    const fieldLabels = {
        image1: 'Image 1',
        title1: 'Title 1',
        content1: 'Content 1',
        image2: 'Image 2',
        title2: 'Title 2',
        content2: 'Content 2',
        image3: 'Image 3',
        title3: 'Title 3',
        content3: 'Content 3',
        quantity: 'Quantity', // Added the quantity field label
    };

    // State to store input field values
    const [formData, setFormData] = useState(
        component?.props?.reduce((acc, field) => {
            acc[field] = '';
            return acc;
        }, {})
    );

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await updatePage(token, { id: id.id, props: formData });
            dispatch(setUser(response.data.data));
        } catch (error) {
            console.log(error);
        }
        document.getElementById('modal_input').close();
    };

    // Handle form cancellation
    const handleCancel = () => {
        console.log('Form Cancelled');
        // Reset input fields to empty
        setFormData(
            component?.props?.reduce((acc, field) => {
                acc[field] = '';
                return acc;
            }, {})
        );
    };

    return (
        <div className="w-full">
            {component?.props?.length > 0 ? (
                component?.props?.map((field, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <label htmlFor={field} className="font-semibold">
                            {fieldLabels[field] || field}
                        </label>
                        <input
                            type={field === 'quantity' ? 'number' : 'text'}
                            id={field}
                            name={field}
                            className="input input-bordered w-full"
                            required
                            onChange={handleChange}
                            placeholder={
                                field.startsWith('image')
                                    ? 'Enter URL of the image'
                                    : field.startsWith('title')
                                        ? 'Enter title (recommend: max 5 words)'
                                        : field.startsWith('content')
                                            ? 'Enter content (recommend: max 20 words)'
                                            : field === 'quantity'
                                                ? 'Enter quantity'
                                                : `Enter ${fieldLabels[field] || field}`
                            }
                        />
                    </div>
                ))
            ) : (
                <p>{t('noRequireFields')}</p>
            )}

            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="buttonMain"
                    onClick={handleSubmit}
                >
                    {t('submit')}
                </button>
            </div>
        </div>
    );
}
