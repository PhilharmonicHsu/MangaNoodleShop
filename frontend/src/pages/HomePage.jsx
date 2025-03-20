import Header from '@components/Header'
import Banner from '@components/Banner'
import Main from '@components/Main'
import Footer from '@components/Footer'
import { checkAuth } from "@api/userApi.js";
import { useEffect, useState, useContext } from 'react';
import {CartContext} from '@context/CartContextProvider.jsx';

export default function HomePage() {
    const [userInfo, setUserInfo] = useState({});
    const cartContext = useContext(CartContext)

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await checkAuth();
                if (userInfo) {
                    setUserInfo(userInfo)
                    cartContext.toggleIsLogin(true)
                } else {
                    cartContext.toggleIsLogin(false)
                }
            } catch (error) {
                cartContext.toggleIsLogin(false)
            }
        };
        
        fetchUserInfo();
    }, [])

    return <>
        <Header userInfo={userInfo} />
        <Banner />
        <Main />
        <Footer />
    </>
}