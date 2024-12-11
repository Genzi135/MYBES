import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProfilePage from "./component/ProfilePage";
import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Trang cá nhân`,
    description: `Viết blog của bạn, thỏa sức sáng tạo với 1 trang cá nhân có thể tùy chỉnh theo ý muốn của bạn`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Trang cá nhân`,
        description: `Viết blog của bạn, thỏa sức sáng tạo với 1 trang cá nhân có thể tùy chỉnh theo ý muốn của bạn`,
        images: MYBES_IMAGE.src,
    },
}

export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <ProfilePage />
            <Footer />
        </div>
    )
}