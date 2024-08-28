import { useState } from 'react';
import { useTranslations } from 'next-intl';
import signupSchema from '../schema/signup.schema';
import { z } from 'zod';

const useSignupForm = () => {
    const t = useTranslations('Authentication');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            signupSchema.parse(formData);
            setErrors({});
            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert('Signup successful!');
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                const formattedErrors = {};

                for (const [key, value] of Object.entries(fieldErrors)) {
                    if (value.length > 0) {
                        formattedErrors[key] = t(value[0]); // Sử dụng t để lấy thông báo dịch
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
        showPassword,
        showConfirmPassword,
        setShowPassword,
        setShowConfirmPassword
    };
};

export default useSignupForm;
