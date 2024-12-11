'use client'
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
    const userData = useSelector(state => state.user.user);
    const route = useRouter();
    const t = useTranslations('UserProvider');

    useEffect(() => {
        if (userData) {
            if (!userData.isActive) {
                window.localStorage.removeItem('token')
                toast.error(t('doNotActive'));
                route.push('/active')
            }
        }
    }, [userData])
    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    )
}