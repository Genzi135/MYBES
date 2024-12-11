'use client';

import FormInput from "./template/components/FormInput";
import RenderComponent from "./template/components/RenderComponent";
import { listComponents } from "./template/components/ListComponents";
import { useState } from "react";
import { listBreaker } from "./template/components/ListBreaker";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function SelectBodyDrawer() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [viewState, setViewState] = useState('component');
    const userData = useSelector(state => state.user.user);

    const t = useTranslations('ProfileSetting');

    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
        document.getElementById('modal_input').showModal();
    };

    return (
        <div className="">
            <div className="flex gap-4 w-full justify-center items-center sticky top-0 my-4 bg-white z-10 shadow-md">
                <div
                    className={`${viewState === "component" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("component")}
                >
                    {t('component')}
                </div>
                <div
                    className={`${viewState === "breaker" ? "cursor-default border-b border-black" : "text-[#A9A9A9] cursor-pointer border-0"
                        } p-[10px] flex gap-2`}
                    onClick={() => setViewState("breaker")}
                >
                    {t('breaker')}
                </div>
            </div>
            <div className="overflow-y-auto w-full min-h-[90vh] px-4">
                {viewState === 'component' && listComponents.map((e, index) => (
                    <div key={index} className="w-full">
                        <RenderComponent id={e.id} />
                        <div className="w-full flex justify-center items-center py-4 border-b-[1px] mb-4">
                            <button className="buttonMain" onClick={() => handleSelectComponent(e)}>{t('select')}</button>
                        </div>
                    </div>
                ))}
                {viewState === 'breaker' && listBreaker.map((e, index) => (
                    <div key={index} className="w-full ">
                        <RenderComponent id={e.id} color={userData?.color} />
                        <div className="w-full flex justify-center items-center py-4 border-b-[1px] mb-4">
                            <button className="buttonMain" onClick={() => handleSelectComponent(e)}>{t('select')}</button>
                        </div>
                    </div>
                ))}
            </div>

            <dialog id="modal_input" className="modal">
                <div className="modal-box w-full max-w-[600px] p-4">
                    <h3 className="font-bold text-lg text-center">{t('inputData')}</h3>
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Render các input động */}
                        {selectedComponent && (
                            <FormInput
                                id={selectedComponent}
                            />
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    )
};
