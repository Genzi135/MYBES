import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BlogPage from "./component/Blog";

export default function Blog() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <BlogPage />
            <Footer />
        </div>
    )
}