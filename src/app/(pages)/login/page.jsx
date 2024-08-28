import NavbarAuth from "@/components/NavbarAuth";
import LoginForm from "./components/LoginForm";

export default async function Login() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavbarAuth />
            <LoginForm />
        </div>
    )
}