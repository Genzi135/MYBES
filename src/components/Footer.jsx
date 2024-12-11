import { useTranslations } from "next-intl";
import Link from "next/link";
import { BsFacebook, BsGoogle, BsInstagram, BsLinkedin } from "react-icons/bs";

export default function Footer() {
    const t = useTranslations('Footer')
    return (
        <div className="w-full h-auto flex justify-center items-center border-t">
            <div className="w-full h-full max-w-[1200px] flex justify-between items-start pt-10 pb-10 sm:flex-row flex-col gap-5 pl-2 pr-2">
                <div className="flex flex-col text-4xl font-semibold">
                    <label>
                        MAKE
                    </label>
                    <label>
                        YOUR BLOG
                    </label>
                    <label>
                        EASY & SIMPLE
                    </label>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href={`/mybes.html`} className="hover:font-semibold">{t('introduction')}</Link>
                    <Link href={`/`} className="hover:font-semibold">{t('home')}</Link>
                    <Link href={`/contact`} className="hover:font-semibold">{t('contact')}</Link>
                </div>
                <div className="flex flex-col gap-1">
                    <label>
                        {t('contactUsWith')}
                    </label>
                    {/* <div className="flex gap-4 justify-start items-center">
                        <Link href={`/`}>
                            <BsFacebook size={30} />
                        </Link>
                        <Link href={`/`}>
                            <BsInstagram size={30} />
                        </Link>
                        <Link href={`/`}>
                            <BsLinkedin size={30} />
                        </Link>
                    </div>
                    <label>
                        {t('or')}
                    </label> */}
                    <div className="flex gap-2 items-center">
                        <BsGoogle size={20} />
                        blogmybes@gmail.com
                    </div>
                </div>
            </div>
        </div>
    )
}