'use client';

import { useDispatch, useSelector } from "react-redux";
import HeaderSelected from "./template/headers/HeaderSelected";
import { changeHColor, changeHeader, deletePage, updateFullPage } from "@/shared/userAPI";
import { useEffect, useState } from "react";
import { setColor, setUser } from "@/hook/redux/features/userSlice";
import { toast } from "react-toastify";
import RenderComponent from "./template/components/RenderComponent";
import SelectBodyDrawer from "./SelectBodyDrawer";
import { BsArrowBarDown, BsArrowBarUp, } from "react-icons/bs";
import FormChange from "./template/components/FormChange";
import { useTranslations } from "next-intl";

export default function ProfileSetting() {
    const [colorSelected, setSelectedColor] = useState('');
    const [disableButtonColor, setDisableButtonColor] = useState(true);
    const [bodyData, setBodyData] = useState([])
    const [indexComponent, setIndex] = useState(null);
    const [isChange, setChange] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const dispatch = useDispatch();

    const t = useTranslations('ProfileSetting')

    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelectComponent = (component, index) => {
        setIndex(index)
        setSelectedComponent(component);
        document.getElementById('modal_input_change').showModal();
    };

    const userData = useSelector(state => state.user.user);


    const listColor = ['#13acc3', '#FFCFEF', '#BFECFF', '#CDC1FF', '#FFF6E3', '#FDDBBB', '#D4F6FF', '#C9E9D2', '#8D493A', '#D0B8A8', '#DC8686', '#A1EEBD', '#7BD3EA', "#79AC78", '#8DDFCB', '#D0E7D2', '#FF8080', '#CDFAD5', '#BEADFA', '#D0BFFF', '#9E7676', '#9F8772'];

    const listHeader = ['HeaderDefault', 'HeaderAvatarLeft', 'HeaderMiniAvatarLeft'];

    const handleChangeHeader = async (id) => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await changeHeader(id, token);
            dispatch(setUser(response.data));
            toast.success(t('changeSuccessful'));
            document.getElementById('modal_header').close();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDemoColor = (color) => {
        if (color) {
            setDisableButtonColor(false);
            dispatch(setColor(color));
            setSelectedColor(color);
        }
    };

    const handleChangeColor = async (color) => {
        if (color) {
            try {
                const token = window.localStorage.getItem('token');
                const response = await changeHColor(color, token);
                dispatch(setUser(response.data));
                toast.success(t('changeSuccessful'));
                setDisableButtonColor(true);
            } catch (error) {
                console.error(error);
            }
        }
    };


    const handleUpClick = (index) => {
        if (index > 0) {
            const newBodyData = [...bodyData];
            [newBodyData[index], newBodyData[index - 1]] = [newBodyData[index - 1], newBodyData[index]];
            setBodyData(newBodyData);
        }
    };
    const handleDownClick = (index) => {
        if (index < bodyData.length - 1) {
            const newBodyData = [...bodyData];
            [newBodyData[index], newBodyData[index + 1]] = [newBodyData[index + 1], newBodyData[index]];
            setBodyData(newBodyData);
        }
    };

    const handleDeleteConfirm = (index) => {
        setSelectedIndex(index)
        document.getElementById('modal_delete').showModal();
    }

    const handleDeleteComponent = async () => {
        console.log(selectedIndex);
        if (selectedIndex >= 0) {
            try {
                const token = window.localStorage.getItem('token')
                const response = await deletePage(token, selectedIndex);
                if (response) {
                    dispatch(setUser(response.data.data))
                    document.getElementById('modal_delete').close();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleUpdateFullPage = async () => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await updateFullPage(token, bodyData);
            console.log(response);
            if (response) {
                dispatch(setUser(response.data.data))
                toast.success(t('changeSuccessful'))
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        setBodyData(userData?.page?.body)
    }, [userData])

    useEffect(() => {
        const arraysAreEqual = (arr1, arr2) => {
            if (arr1?.length !== arr2?.length) return false;
            return arr1?.every((el, index) => el.id === arr2[index].id);
        };

        setChange(!arraysAreEqual(userData?.page?.body, bodyData));
    }, [bodyData, userData?.page?.body]);


    return (
        <div className="w-full h-full flex flex-col sm:p-0 p-3 gap-4">
            <div className="flex justify-center items-center">
                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>{t('color')}</div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 p-2">
                {listColor.map((e, index) => (
                    <div key={index}
                        onClick={() => handleDemoColor(e)}
                        className="w-5 h-5 rounded-full transition-transform ease-in-out cursor-pointer"
                        style={{ backgroundColor: e }}></div>
                ))}
                <div className="flex justify-center items-center gap-4 mt-2">
                    <button className="buttonMain !bg-white !text-black border-[2px] hover:!bg-gray-100"
                        onClick={() => handleChangeColor('#13acc3')}
                    >{t('returnToDefault')}</button>
                    <button className={`buttonMain ${disableButtonColor ? "!bg-gray-500" : ""}`}
                        disabled={disableButtonColor}
                        onClick={() => handleChangeColor(colorSelected)}
                    >{t('change')}</button>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Header</div>
            </div>
            <HeaderSelected id={userData?.page?.header?.id} props={userData} />
            <div className="w-full flex justify-center items-center">
                <button className="buttonMain" onClick={() => { document.getElementById('modal_header').showModal(); }}>{t('changeHeader')}</button>
            </div>

            <dialog id="modal_header" className="modal">
                <div className="modal-box w-full max-w-[900px]">
                    <h3 className="font-bold text-lg text-center">{t('select')} Header</h3>
                    <div className="flex flex-col gap-4 mt-10">
                        {listHeader.map((e, index) => (
                            <div key={index} className="w-full">
                                <HeaderSelected id={e} props={userData} />
                                <div className="w-full flex justify-center items-center py-4 border-b-[1px]">
                                    <button className="buttonMain" onClick={() => handleChangeHeader(e)}>{t('select')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>

            {/* Body Section */}
            <div className="flex justify-center items-center">
                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Body</div>
            </div>

            <div className="w-full h-auto flex flex-col justify-center items-center">
                {bodyData?.map((e, index) => (
                    <div className="w-full h-full relative flex justify-center items-end group" key={index} >
                        <RenderComponent id={e.id} props={e.props} color={userData?.color} />
                        <div className="absolute hidden group-hover:flex mb-10 gap-4">
                            <button className="btn btn-md rounded-full" onClick={() => handleUpClick(index)}><BsArrowBarUp size={20} /></button>
                            <button className="btn btn-dm rounded-full" onClick={() => handleDownClick(index)}><BsArrowBarDown size={20} /></button>
                            <button className="btn btn-neutral btn-dm rounded-full" onClick={() => handleSelectComponent(e, index)}>{t('change')}</button>
                            <button className="btn btn-error btn-dm rounded-full" onClick={() => handleDeleteConfirm(index)}>{t('delete')}</button>
                        </div>
                    </div>
                ))}

                {isChange && <div className="sticky bottom-10 mt-4">
                    <button className="btn btn-accent rounded-full btn-lg shadow-lg" onClick={() => handleUpdateFullPage()}>{t('confirmChange')}</button>
                </div>}
            </div>

            <div className="drawer">
                <input id="body-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex justify-center items-center">
                    <label htmlFor="body-drawer" className="buttonMain drawer-button mb-10">{t('addComponent')}</label>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="body-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className=" bg-white min-h-full w-[80%] sm:max-w-[1000px] px-4">
                        <SelectBodyDrawer />
                    </div>
                </div>
            </div>

            <dialog id="modal_delete" className="modal">
                <div className="modal-box w-full max-w-[600px] p-4">
                    <h3 className="font-bold text-lg text-center">{t('confirmDelete')}</h3>
                    <div className="flex justify-center items-end gap-4 mt-4">
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">{t('close')}</button>
                            </form>
                        </div>
                        <button className="btn btn-error" onClick={() => handleDeleteComponent()}>{t('confirm')}</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>

            {/* Modal for Component Input */}
            <dialog id="modal_input_change" className="modal">
                <div className="modal-box w-full max-w-[600px] p-4">
                    <h3 className="font-bold text-lg text-center">{t('changeData')}</h3>
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Render các input động */}
                        {selectedComponent && (
                            <FormChange
                                id={selectedComponent}
                                index={indexComponent}
                            />
                        )}
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    );
}
