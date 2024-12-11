import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations('Contact');

    return (
        <div className="container mx-auto p-6 flex justify-center items-center min-h-screen bg-gray-100">
            {/* Card liên hệ */}
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 md:p-12">
                {/* Tiêu đề chính */}
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
                    {t("title")}
                </h1>
                <p className="text-center text-gray-500 mb-12">{t("subtitle")}</p>

                {/* Form liên hệ */}
                <form className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-2 top-1 text-gray-500 transform scale-90 -translate-y-1/2 bg-white px-1 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 transition-all peer-focus:scale-90 peer-focus:-translate-y-1/2"
                        >
                            {t("name_label")}
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-2 top-1 text-gray-500 transform scale-90 -translate-y-1/2 bg-white px-1 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 transition-all peer-focus:scale-90 peer-focus:-translate-y-1/2"
                        >
                            {t("email_label")}
                        </label>
                    </div>

                    <div className="relative">
                        <textarea
                            id="message"
                            className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none peer"
                            placeholder=" "
                            rows="6"
                        />
                        <label
                            htmlFor="message"
                            className="absolute left-2 top-1 text-gray-500 transform scale-90 -translate-y-1/2 bg-white px-1 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 transition-all peer-focus:scale-90 peer-focus:-translate-y-1/2"
                        >
                            {t("message_label")}
                        </label>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-transform transform hover:-translate-y-1 active:translate-y-0 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            {t("submit_button")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
