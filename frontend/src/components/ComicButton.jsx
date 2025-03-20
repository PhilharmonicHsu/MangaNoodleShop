import { motion } from "framer-motion";
import CartDialog from "./CartDialog";
import { useEffect, useRef, useContext } from "react";
import { getCartItems } from "@api/noodleApi";
import { CartContext } from "@context/CartContextProvider";

export default function ComicButton() {
    const dialogRef = useRef()
    const cartContext = useContext(CartContext)
    
    const fetchCartItems = async () => {
        try {
            const data = await getCartItems()
            cartContext.updateItems(data.orders)
            cartContext.updateTotalPrice(data.total)
        } catch (error) {
            console.error("Error fetching noodles:", error);
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <>
            {
                cartContext.items.length === 0
                ? <></>
                : <motion.button
                    onClick={() => dialogRef.current.open()}
                    className="px-8 py-2 text-xl font-bangers rounded-xl 
                                bg-gradient-to-r from-[#295179] to-[#0AB1D7]
                                border-3 border-black shadow-lg 
                                hover:scale-105 active:scale-95 
                                transition-transform duration-200
                                flex gap-0 justify-center items-center relative cursor-pointer"
                    animate={{ 
                        y: [0, 10, 0],
                        borderTopLeftRadius: ["60%", "40%", "60%"],
                        borderTopRightRadius: ["60%", "50%", "40%", "60%"],
                        borderBottomRightRadius: ["50%", "40%", "60%", "50%"],
                        borderBottomLeftRadius: ["55%", "60%", "30%", "55%"],
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:8px_8px] opacity-40"></span>
                    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99707 3.49597C2.99707 3.36336 3.04975 3.23619 3.14352 3.14242C3.23729 3.04865 3.36446 2.99597 3.49707 2.99597H3.93507C4.66207 2.99597 5.08007 3.46897 5.32207 3.94097C5.48707 4.26397 5.60607 4.65797 5.70507 4.99997H16.0001C16.1546 5.00002 16.307 5.03587 16.4453 5.10472C16.5837 5.17356 16.7042 5.27353 16.7974 5.39677C16.8906 5.52001 16.9539 5.66317 16.9825 5.81502C17.0111 5.96687 17.0041 6.12328 16.9621 6.27197L15.4661 11.547C15.3471 11.9655 15.0948 12.3338 14.7476 12.596C14.4004 12.8582 13.9772 13 13.5421 13H8.46307C8.02435 13.0001 7.59774 12.856 7.24899 12.5898C6.90023 12.3237 6.64867 11.9502 6.53307 11.527L5.89107 9.17197L5.88107 9.13997L4.85107 5.64197L4.75107 5.30497C4.65107 4.95897 4.56307 4.65297 4.43107 4.39597C4.27207 4.08597 4.12607 3.99597 3.93507 3.99597H3.49707C3.36446 3.99597 3.23729 3.94329 3.14352 3.84952C3.04975 3.75576 2.99707 3.62858 2.99707 3.49597ZM8.50007 17C8.8979 17 9.27943 16.8419 9.56073 16.5606C9.84204 16.2793 10.0001 15.8978 10.0001 15.5C10.0001 15.1021 9.84204 14.7206 9.56073 14.4393C9.27943 14.158 8.8979 14 8.50007 14C8.10225 14 7.72071 14.158 7.43941 14.4393C7.15811 14.7206 7.00007 15.1021 7.00007 15.5C7.00007 15.8978 7.15811 16.2793 7.43941 16.5606C7.72071 16.8419 8.10225 17 8.50007 17ZM13.5001 17C13.8979 17 14.2794 16.8419 14.5607 16.5606C14.842 16.2793 15.0001 15.8978 15.0001 15.5C15.0001 15.1021 14.842 14.7206 14.5607 14.4393C14.2794 14.158 13.8979 14 13.5001 14C13.1022 14 12.7207 14.158 12.4394 14.4393C12.1581 14.7206 12.0001 15.1021 12.0001 15.5C12.0001 15.8978 12.1581 16.2793 12.4394 16.5606C12.7207 16.8419 13.1022 17 13.5001 17Z" fill="#F5C264"/>
                    </svg>
                    <div 
                        className="hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-[#F5C264] to-white w-20"
                    >
                        
                        ${cartContext.totalPrice}(
                        {
                            cartContext.items.reduce((prevResult, item) => {
                                return prevResult + item.quantity
                            }, 0)
                        })
                    </div>
                </motion.button>
            }
            <CartDialog ref={dialogRef} />
        </>
    );
}