'use client'

import { useTranslations } from "next-intl"

export default function ChatBotDocs() {
    const t = useTranslations("ChatBotDocs")
    return (
        <div className="w-full flex flex-col gap-2 justify-center items-center text-center mt-2">
            <div>{t("intro")}</div>
            <ul>
                <li className="text-left">{t("model_text")}</li>
                <li className="text-left">{t("model_image")}</li>
            </ul>
            <div>{t("free_note")}</div>
            <ul className="text-left">
                <li className="text-warning">{t("warnings.testing_feature")}</li>
                <li className="text-red-500">{t("warnings.no_history")}</li>
                <li>{t("warnings.independent_questions")}</li>
                <li>{t("warnings.image_generation")}</li>
                <li>{t("warnings.er")} <a href="/contact" className="underline font-semibold">{t("contact")}</a></li>
            </ul>
            <div>{t("thank_you")}</div>
        </div>
    )
}
