import { useTranslations } from "next-intl";

export default function HelpsPage() {
    const t = useTranslations("Helps");

    return (
        <div className="container mx-auto p-6">
            {/* Tiêu đề chính */}
            <h1 className="text-4xl font-bold mb-8 text-center">{t("title")}</h1>

            {/* Phần FAQ */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">{t("faq_title")}</h2>
                <ul className="space-y-6">
                    <li className="p-4 bg-white shadow-lg rounded-md">
                        <h3 className="text-xl font-semibold mb-2">{t("how_to_create_post.question")}</h3>
                        <p>{t("how_to_create_post.answer")}</p>
                    </li>
                    <li className="p-4 bg-white shadow-lg rounded-md">
                        <h3 className="text-xl font-semibold mb-2">{t("how_to_edit_profile.question")}</h3>
                        <p>{t("how_to_edit_profile.answer")}</p>
                    </li>
                    <li className="p-4 bg-white shadow-lg rounded-md">
                        <h3 className="text-xl font-semibold mb-2">{t("how_to_reset_password.question")}</h3>
                        <p>{t("how_to_reset_password.answer")}</p>
                    </li>
                </ul>
            </div>

            {/* Phần liên hệ */}
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">{t("further_assistance")}</h2>
                <p>
                    {t("further_assistance")}{" "}
                    <a href="/contact" className="text-blue-600 font-bold underline">
                        {t("contact_us")}
                    </a>.
                </p>
            </div>
        </div>
    );
}
