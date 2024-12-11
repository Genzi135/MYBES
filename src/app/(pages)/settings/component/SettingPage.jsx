'use client';

import { useState } from "react";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSettings";
import { useTranslations } from "next-intl";

export default function SettingPage() {
    const [viewState, setViewState] = useState("profile");
    const t = useTranslations('Profile')

    return (
        <div className="flex flex-col w-full max-w-[800px]">
            <div className="flex pt-[10px] pb-[10px] gap-2">
                <div
                    className={`${viewState === "profile" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("profile")}
                >
                    {t('profile')}
                </div>
                <div
                    className={`${viewState === "account" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("account")}
                >
                    {t('account')}
                </div>
            </div>

            {/* Profile Content */}
            {viewState === "profile" && (
                <div>
                    <ProfileSetting />
                </div>
            )}
            {viewState === "account" && (
                <div>
                    <AccountSetting />
                </div>
            )}
        </div>
    );
}
