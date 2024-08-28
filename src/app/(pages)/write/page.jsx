import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WritePage from "./components/WritePage";

export default function Write() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <WritePage />
            <Footer />
        </div>
    )
}