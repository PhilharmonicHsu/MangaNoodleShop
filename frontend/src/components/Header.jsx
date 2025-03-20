import ComicButton from "./ComicButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "@context/CartContextProvider";
import { useContext } from "react";
import {logout} from '@api/userApi'

export default function Header({userInfo, isLogin}) {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext)

    const handleLogout = async () => {
        await logout()
        window.location.reload();
    }

    return <header className="bg-[#FCFCE3] h-20 px-10 flex justify-between items-center fixed top-0 left-0 z-50 w-full
        bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:40px_40px]
    ">
        <div className="h-10 flex justify-center items-center gap-4">
            <img className="h-10" src='logo.png' />
            <div className="hidden sm:flex flex-col lg:flex-row justify-center items-start lg:items-end">
                <img className="h-6 lg:h-8" src="manga.png" />
                <img className="h-4 lg:h-6" src="noodle-shop.png" />
            </div>
        </div>
        {
            cartContext.isLogin  ? <motion.div 
                className="font-bangers text-2xl"
                animate={{ 
                    y: [0, 10, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
                Hi&nbsp;
                <ins>{userInfo.username} </ins>
                &nbsp;How you Doing !
            </motion.div>
            : <></>
        }
        
        <div className="button-area flex gap-4 items-center">
            <ComicButton />
            {
                cartContext.isLogin 
                ? <button 
                    className="
                        cursor-pointer hover:bg-gray-900 font-bangers text-white text-2xl bg-black px-10 py-2 rounded-full
                        hover:scale-105 active:scale-95 
                        transition-transform duration-200
                    "
                    onClick={handleLogout}
                >
                    <div className="hover:border-b-1 hover:border-white">Logout</div>
                </button>
                : <button 
                    className="
                        cursor-pointer hover:bg-gray-900 font-bangers text-white text-2xl bg-black px-10 py-2 rounded-full
                        hover:scale-105 active:scale-95 
                        transition-transform duration-200
                    "
                    onClick={() => navigate('/login')}
                >
                    <div className="hover:border-b-1 hover:border-white">
                        Log in
                    </div>
                </button>
            }
        </div>
    </header>
}