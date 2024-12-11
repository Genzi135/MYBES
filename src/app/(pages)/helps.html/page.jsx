import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HelpsPage from "./components/HelpsPage";

export default function Helps() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <HelpsPage />
            <Footer />
        </div>
    )
}