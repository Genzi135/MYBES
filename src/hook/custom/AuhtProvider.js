'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslations } from 'next-intl';
import { getMe } from '@/shared/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUser } from '../redux/features/userSlice';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Định nghĩa các route riêng tư cần đăng nhập
const privateRoutes = ['/profile', '/profile#blog', '/profile#save', '/write.html', '/settings'];

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('AuthProvider');

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            const isPrivateRoute = privateRoutes.includes(pathname);

            if (isPrivateRoute && !token) {
                // Nếu là route riêng tư và không có token, chuyển hướng đến trang login
                toast.warning(t('loginRequired'));
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                return;
            }

            if (token) {
                try {
                    const data = await getMe(token);
                    if (data) {
                        dispatch(setUser(data));
                        dispatch(setLogin());
                    }
                } catch (error) {
                    localStorage.removeItem('token'); // Xóa token không hợp lệ
                    toast.error(t('sessionExpired'));
                    setTimeout(() => {
                        router.push('/login');
                    }, 10);
                }
            }
        };

        checkToken();
    }, [pathname, router, t, dispatch]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
