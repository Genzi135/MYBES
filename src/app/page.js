import LanguageSwitcher from "@/components/languages/LanguagesSwitcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <div>
      {t('title')}
      <LanguageSwitcher />
    </div>
  );
}
