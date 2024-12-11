'use client';

import { useEffect, useState } from 'react';
import { updatePageComponent } from '@/shared/userAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '@/hook/redux/features/userSlice';
import { listUI } from './ListUI';
import { useTranslations } from 'next-intl';



export default function FormChange({ id, index }) {
    const [component, setComponent] = useState(null);
    const [formData, setFormData] = useState({});
    const t = useTranslations('Form')
    const dispatch = useDispatch()


    useEffect(() => {
        if (id?.id) {
            const matchedComponent = listUI.find((item) => item.id === id.id);
            setComponent(matchedComponent);

            if (id.props && matchedComponent?.props) {
                // Khởi tạo dữ liệu form từ id.props và required
                const initialData = matchedComponent.props.reduce((acc, field) => {
                    acc[field] = id.props[field] || ''; // Lấy giá trị từ props hoặc để trống
                    return acc;
                }, {});
                setFormData(initialData);
            }
        }
    }, [id]);

    // Hàm xử lý thay đổi giá trị input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý submit
    const handleSubmit = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await updatePageComponent(token, index, { id: id.id, props: formData })
            if (response) {
                dispatch(setUser(response.data.data))
                document.getElementById("modal_input_change").close()
            }

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    if (!component) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-full">

            {component?.props.map((field, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2">
                        <label htmlFor={field} className="font-semibold">
                            {field}
                        </label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            className="input input-bordered w-full"
                            value={formData[field] || ''}
                            onChange={handleChange}
                            placeholder={`Enter ${field}`}
                        />
                    </div>
                );
            })}

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
