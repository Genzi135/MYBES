import NavbarAuth from "@/components/NavbarAuth";
import LoginForm from "./components/LoginForm";
import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Đăng nhập`,
    description: `Đăng nhập vào MYBES. Viết blog của bạn, thỏa sức sáng tạo với 1 editor có khả năng tùy chỉnh cao và chatbot AI`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Đăng nhập`,
        description: `Đăng nhập vào MYBES. Viết blog của bạn, thỏa sức sáng tạo với 1 editor có khả năng tùy chỉnh cao và chatbot AI`,
        images: MYBES_IMAGE.src,
    },
}

export default async function Login() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavbarAuth />
            <LoginForm />
        </div>
    )
}