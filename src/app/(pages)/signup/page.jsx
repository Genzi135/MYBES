import NavbarAuth from "@/components/NavbarAuth";
import SignupForm from "./components/SignupForm";

export default async function Signup() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavbarAuth />
            <SignupForm />
        </div>
    )
}