import Navbar from "@/components/Navbar";
import SettingPage from "./component/SettingPage";
import Footer from "@/components/Footer";
import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Cài đặt`,
    description: `Cài đặt và tùy chỉnh trang cá nhân theo ý thích của bạn`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Cài đặt`,
        description: `Cài đặt và tùy chỉnh trang cá nhân theo ý thích của bạn`,
        images: MYBES_IMAGE.src,
    },
}

export default async function Settings() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <SettingPage />
            <Footer />
        </div>
    )
}