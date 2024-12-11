'use client';

import { setUser } from "@/hook/redux/features/userSlice";
import { changePassword, requestPasswordReset } from "@/shared/api";
import { changeAvatar, changeName } from "@/shared/userAPI";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountSetting() {
    const t = useTranslations('AccountSetting');

    const userData = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState(null);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null); // State để lưu trữ file avatar
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const router = useRouter();

    useEffect(() => {
        setDataSource(userData);
    }, [userData]);

    const handleNameChange = async () => {
        if (name.trim() === '') {
            toast.error(t('name.empty'));
            return;
        }
        const token = window.localStorage.getItem('token');
        const response = await changeName(name, token);
        if (response) {
            dispatch(setUser(response.data));
            setName('');
            toast.success(t('name.success'));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setAvatarFile(file); // Lưu file avatar đã chọn
        setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    };

    const handleSummitAvatar = async () => {
        if (!avatarFile) {
            return;
        }
        try {
            const token = window.localStorage.getItem('token');
            // Gửi avatar qua API
            const response = await changeAvatar(token, avatarFile);

            if (response) {
                dispatch(setUser(response.data)); // Cập nhật Redux với dữ liệu mới
                setAvatarFile(null); // Xóa file đã chọn sau khi upload
                setAvatar(null);
                toast.success(t('avatar.success'));
            } else {
                toast.error(t('avatar.failed'));
            }
        } catch (error) {
            toast.error(t('avatar.failed'));
            console.error('Error updating avatar:', error);
        }
    };


    const handleGetOTP = async () => {
        const response = await requestPasswordReset(userData.email);
        if (response) {
            toast.info(t('otp.sent'));
        }
    };

    const handleChangePassword = async () => {
        if (!otp || !password || !passwordConfirm) {
            toast.error(t('password.fill_all'));
            return;
        }
        if (password !== passwordConfirm) {
            toast.error(t('password.mismatch'));
            return;
        }
        const token = window.localStorage.getItem('token');
        const response = await changePassword(otp, token, password);
        if (response) {
            setOTP('');
            setPassword('');
            setPasswordConfirm('');
            toast.success(t('password.success'));
            window.localStorage.removeItem('token');
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-10">
            {/* Thay đổi tên */}
            <div className="flex flex-col w-full gap-2">
                <div>{t('name.label')}</div>
                <div className="flex gap-2 justify-center items-center w-full">
                    <input
                        type="text"
                        placeholder={dataSource?.name}
                        className="inputBar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="buttonMain" onClick={handleNameChange}>
                        {t('name.button')}
                    </button>
                </div>
            </div>

            {/* Thay đổi avatar */}
            <div className="flex flex-col w-full gap-2">
                <div>{t('avatar.label')}</div>
                <div className="flex justify-center items-center">
                    <img
                        src={avatar || dataSource?.avatarUrl || 'https://via.placeholder.com/144'}
                        alt="Avatar"
                        className="w-36 h-36 rounded-box"
                    />
                </div>
                <div className="flex gap-2 justify-center items-center w-full">
                    <input type="file" className="inputBar" onChange={handleAvatarChange} />
                    <button className="buttonMain" onClick={handleSummitAvatar}>
                        {t('avatar.button')}
                    </button>
                </div>
            </div>

            {/* Thay đổi mật khẩu */}
            <div className="flex flex-col w-full gap-2">
                <div>{t('password.label')}</div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <button className="buttonMain" onClick={handleGetOTP}>
                        {t('otp.button')}
                    </button>
                    <input
                        value={otp}
                        className="inputBar !max-w-[200px]"
                        placeholder={t('otp.placeholder')}
                        onChange={(e) => setOTP(e.target.value)}
                    />
                    <input
                        value={password}
                        placeholder={t('password.new')}
                        className="inputBar !max-w-[200px]"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        value={passwordConfirm}
                        placeholder={t('password.confirm')}
                        className="inputBar !max-w-[200px]"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <button
                        className="buttonMain"
                        onClick={handleChangePassword}
                    >
                        {t('password.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}
