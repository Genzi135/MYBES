// useLoginForm.js
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import loginSchema from '../schema/Login.schema';
import { z } from 'zod';
import { setEmail, setLogin } from '../../../../hook/redux/features/userSlice'; // Import action from user slice
import { Login } from '@/shared/api';
import { useAppDispatch } from '@/hook/redux/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useLoginForm = () => {
    const t = useTranslations('Authentication');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch(); // Use custom hook for dispatch
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            loginSchema.parse(formData);
            setErrors({});
            const response = await Login(formData.email, formData.password);

            if (response) {
                const token = response.access_token;
                localStorage.setItem('token', token);
                dispatch(setEmail(formData.email));
                dispatch(setLogin());
                toast.success(t('loginSuccess'));

                setTimeout(() => {
                    router.push('/');
                }, 500);

            }
        } catch (err) {
            if (err.response.data.message === "Invalid credentials") {
                toast.error(t('Invalid credentials'))
            }
            if (err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                const formattedErrors = {};

                for (const [key, value] of Object.entries(fieldErrors)) {
                    if (value.length > 0) {
                        formattedErrors[key] = t(value[0]);
                    }
                }

                setErrors(formattedErrors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    };
};

export default useLoginForm;
