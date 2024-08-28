'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import loginSchema from '../schema/Login.schema';
import { z } from 'zod';

const useLoginForm = () => {
    const t = useTranslations('Authentication');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert('Form submitted successfully!');
        } catch (err) {
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
