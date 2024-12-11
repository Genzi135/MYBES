import { z } from 'zod';

const signupSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'nameMin' }) // Tên phải có ít nhất 2 ký tự
        .max(50, { message: 'nameMax' }) // Tên không được vượt quá 50 ký tự
        .nonempty({ message: 'nameRequired' }), // Tên là bắt buộc
    email: z
        .string()
        .email({ message: 'emailInvalid' }) // Email không hợp lệ
        .nonempty({ message: 'emailRequired' }), // Email là bắt buộc
    password: z
        .string()
        .min(6, { message: 'passwordMin' }) // Mật khẩu phải có ít nhất 6 ký tự
        .nonempty({ message: 'passwordRequired' }), // Mật khẩu là bắt buộc
    confirmPassword: z
        .string()
        .min(6, { message: 'passwordMin' }) // Xác nhận mật khẩu phải có ít nhất 6 ký tự
        .nonempty({ message: 'confirmPasswordRequired' }), // Xác nhận mật khẩu là bắt buộc
    termsAccepted: z
        .boolean()
        .refine((val) => val === true, { message: 'termsRequired' }) // Phải đồng ý với điều khoản
}).refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsMustMatch', // Mật khẩu không khớp
    path: ['confirmPassword'], // Gắn lỗi vào confirmPassword
});

export default signupSchema;
