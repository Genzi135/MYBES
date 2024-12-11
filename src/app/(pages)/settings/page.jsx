import Navbar from "@/components/Navbar";
import SettingPage from "./component/SettingPage";
import Footer from "@/components/Footer";

export default async function Settings() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <SettingPage />
            <Footer />
        </div>
    )
}