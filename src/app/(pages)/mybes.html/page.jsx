import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MYBESpage from "./components/MYBES";
import MYBES_LOGO from '../../../assets/logo/MYBES Logo Original-02.svg';
import MYBES_ICON from '../../../assets/logo/MYBES Logo Original-05.svg';

export const metadata = {
    title: "MYBES - Giới thiệu",
    description: "MYBES là nền tảng blog giúp bạn tạo blog cá nhân với editor tùy chỉnh, chatbot AI hỗ trợ viết nội dung. Trải nghiệm viết blog dễ dàng và tiện lợi cùng MYBES.",
    openGraph: {
        title: "MYBES - Giới thiệu",
        description: "Nền tảng blog MYBES giúp bạn tạo blog của riêng mình, hỗ trợ bằng chatbot AI miễn phí.",
        siteName: "MYBES",
        images: [
            {
                url: MYBES_LOGO.src,
                width: 800,
                height: 800,
                alt: "MYBES Logo",
            },
        ],
        locale: "vi_VN",
        type: "website",
    },
    icons: {
        icon: MYBES_ICON.src,
        shortcut: MYBES_ICON.src,
        apple: MYBES_ICON.src,
    },
};

export default function Write() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center scroll-smooth">
            <Navbar />
            <MYBESpage />
            <Footer />
        </div>
    );
}
