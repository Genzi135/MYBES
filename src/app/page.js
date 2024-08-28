import Footer from "@/components/Footer";
import HomePage from "@/components/homePage/HomePage";
import Navbar from "@/components/Navbar";
import NavbarAuth from "@/components/NavbarAuth";

export default function Home() {

  const isLogin = false;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {!isLogin ? <Navbar /> : <NavbarAuth />}
      <HomePage />
      <Footer />
    </div>
  );
}
