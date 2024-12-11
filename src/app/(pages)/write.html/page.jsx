import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WritePage from "./components/WritePage";
import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Viết bài`,
    description: `Viết blog của bạn, thỏa sức sáng tạo với 1 editor có khả năng tùy chỉnh cao và chatbot AI`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Viết bài`,
        description: `Viết blog của bạn, thỏa sức sáng tạo với 1 editor có khả năng tùy chỉnh cao và chatbot AI`,
        images: MYBES_IMAGE.src,
    },
}

export default function Write() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <WritePage />
            <Footer />
        </div>
    )
}