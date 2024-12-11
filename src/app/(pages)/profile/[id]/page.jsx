import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserProfilePage from "./component/UserProfilePage";
import { getUserById } from "@/shared/api";

export async function generateMetadata({ params, searchParams }, parent) {

    const id = (await params).id

    const userData = await getUserById(id)

    return {
        title: `${id}'s Profile`,
        description: `Profile của ${userData?.name}.`,
        author: `${userData?.name}`,
        keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, ${userData?.name} blog, mybes ${userData?.name}, content creator, AI`,
        openGraph: {
            title: `${id}'s Profile`,
            description: `${userData?.bio}.`,
            images: userData?.avatar_url ? [userData?.avatar_url] : [],
        },
    }
}

export default function UserProfile() {

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <Navbar />
            <UserProfilePage />
            <Footer />
        </div>
    )
}