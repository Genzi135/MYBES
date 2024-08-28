import { z } from 'zod';

// Tạo schema Zod cho xác thực form với các thông báo lỗi có thể dịch
const loginSchema = z.object({
    email: z.string()
        .email({ message: 'emailInvalid' })
        .min(1, { message: 'emailRequired' }),
    password: z.string()
        .min(6, { message: 'passwordMin' })
        .min(1, { message: 'passwordRequired' }),
});

export default loginSchema;
