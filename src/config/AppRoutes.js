import { Routes, Route } from "react-router-dom";
import { PrivateLayout } from "../components/layout/PrivateLayout";
import { PublicLayout } from "../components/layout/PublicLayout";
import { LoginView } from "../components/view/Login/LoginView";
import { AboutView } from "../components/view/About/AboutView";
import { useUser } from "../hooks/useUser";
import { DashboardView } from "../components/view/Dashboard/DashboardView";
import { BrandsView } from "../components/view/Brands/BrandsView";
import { SinginView } from "../components/view/Singin/SinginView";
import { NotFound } from "../components/view/NotFound/NotFound";
import { HomeView } from "../components/view/Home/HomeView";
import { JobsView } from "../components/view/Jobs/JobsView";
import { ProfileView } from "../components/view/Profile/ProfileView";
import { AccountView } from "../components/view/Account/AccountView";
import { PublicationsView } from "../components/view/Publications/PublicationsView";
import { employMenuList, enterpriseMenuList } from "./menuItems";
import { PROFILE } from "../const/routes";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LinearGradientLoader } from "../components/common/Loaders/LinearGradientLoader";
import { AppLogoLoader } from "../components/common/Loaders/AppLogoLoader";
import { useLoadApp } from "../hooks/useLoadApp";


export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/singin" element={<SinginView />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export const EnterpriseRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/jobs/*" element={<JobsView />} />
            <Route path="/publications/*" element={<PublicationsView />} />
            <Route path="/profile/*" element={<ProfileView />} />
            <Route path="/account/*" element={<AccountView />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export const EmployRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/jobs/*" element={<JobsView />} />
            <Route path="/publications/*" element={<PublicationsView />} />
            <Route path="/profile/*" element={<ProfileView />} />
            <Route path="/account/*" element={<AccountView />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default function AppRoutes() {
    const { user, setUser } = useUser() //se verifica el usuario y se arroja el layout dependiendo de su rol
    const { get: getProfile } = useFetch({ route: PROFILE })
    const { loadingApp, setLoadingApp } = useLoadApp()

    useEffect(() => {
        setLoadingApp(true)
        try {
            (async () => await getProfile())()
                .then(e => setUser(e))
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoadingApp(false)
        }
    }, [setLoadingApp])

    if (loadingApp) return <AppLogoLoader />

    if (!loadingApp && true) {
        return (
            <Routes>
                {
                    (user.role)
                        ? <Route path="/*" element={
                            <PrivateLayout
                                children={
                                    <>
                                        {(user.role === 3) && <EmployRoutes />}
                                        {(user.role === 4) && <EnterpriseRoutes />}
                                    </>
                                }
                                menuList={
                                    (user.role === 3) ? employMenuList
                                        : (user.role === 4) && enterpriseMenuList
                                }
                            />
                        } />
                        : <Route path="/*" element={<PublicLayout children={<PublicRoutes />} />} />
                }
            </Routes>
        )
    }
}
