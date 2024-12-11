import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactPage from "./components/ContactPage";

export const metadata = {
    title: 'Liên hệ'
}

export default function Contact() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <ContactPage />
            <Footer />
        </div>
    )
}