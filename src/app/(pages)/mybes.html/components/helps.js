'use client';

import { useTranslations } from "next-intl";
import { BsPencilSquare } from "react-icons/bs";

export default function Helps() {
    const t = useTranslations('Helps');
    return (
        <div className="w-full flex flex-col gap-2 justify-center items-center text-center mt-2">
            <div tabIndex="0" className="collapse collapse-arrow border-base-300 bg-base-200 border">
                <div className="collapse-title text-xl font-medium">
                    {t('create_account_title')}
                </div>
                <div className="collapse-content">
                    <ol className="text-left">
                        <li>{t('create_account_step1')}</li>
                        <li>
                            {t('create_account_step2')} <a href="https://mybes.vn/register" className="font-semibold underline">MYBES</a>
                        </li>
                        <li>{t('create_account_step3')}</li>
                        <li>{t('create_account_step4')}</li>
                        <li>{t('create_account_step5')}</li>
                        <li>{t('create_account_step6')}</li>
                        <li>{t('create_account_step7')}</li>
                        <li>{t('create_account_step8')}</li>
                    </ol>
                </div>
            </div>
            <div tabIndex="0" className="collapse collapse-arrow border-base-300 bg-base-200 border">
                <div className="collapse-title text-xl font-medium">
                    {t('create_blog_title')}
                </div>
                <div className="collapse-content">
                    <ol className="text-left">
                        <li className="flex gap-2 flex-wrap">
                            {t('create_blog_step1')} <BsPencilSquare size={20} />
                        </li>
                        <li>{t('create_blog_step2')}</li>
                        <li>{t('create_blog_step3')}</li>
                        <li>{t('create_blog_step4')}</li>
                        <li>{t('create_blog_step5')}</li>
                        <li>{t('create_blog_step6')}</li>
                        <li>{t('create_blog_step7')}</li>
                        <li>{t('create_blog_step8')}</li>
                    </ol>
                </div>
            </div>
            <div tabIndex="0" className="collapse collapse-arrow border-base-300 bg-base-200 border">
                <div className="collapse-title text-xl font-medium">
                    {t('delete_blog_title')}
                </div>
                <div className="collapse-content">
                    <ol className="text-left">
                        <li>{t('delete_blog_step1')}</li>
                        <li>{t('delete_blog_step2')}</li>
                        <li>{t('delete_blog_step3')}</li>
                    </ol>
                </div>
            </div>
            <div tabIndex="0" className="collapse collapse-arrow border-base-300 bg-base-200 border">
                <div className="collapse-title text-xl font-medium">
                    {t('edit_blog_title')}
                </div>
                <div className="collapse-content">
                    <ol className="text-left">
                        <li>{t('edit_blog_step1')}</li>
                        <li>{t('edit_blog_step2')}</li>
                        <li>{t('edit_blog_step3')}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
