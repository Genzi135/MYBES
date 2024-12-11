import { useState } from 'react';
import { useTranslations } from 'next-intl';
import signupSchema from '../schema/signup.schema';
import { z } from 'zod';
import { register } from '@/shared/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useSignupForm = () => {
    const t = useTranslations('Authentication');
    const [formData, setFormData] = useState({
        name: '', // Thêm trường name
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const route = useRouter();
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
            signupSchema.parse(formData); // Validate dữ liệu
            setErrors({}); // Reset lỗi
            // Giả lập gửi dữ liệu
            try {
                const response = await register(formData.email, formData.password, formData.name);
                if (response) {
                    toast.success(t('registerSuccessful'))
                    toast.warning(t('sentOTPplsCheckYourMail'))
                    route.push("/active")
                }
            } catch (error) {
                toast.error(t("emailExist"))
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                const formattedErrors = {};

                for (const [key, value] of Object.entries(fieldErrors)) {
                    if (value.length > 0) {
                        formattedErrors[key] = t(value[0]); // Sử dụng t để dịch lỗi
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
        setShowConfirmPassword,
    };
};

export default useSignupForm;
