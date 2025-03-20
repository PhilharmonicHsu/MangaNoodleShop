
import { useContext } from "react";
import { orderNoodle, getCartItems } from "@api/noodleApi"
import { CartContext } from "@context/CartContextProvider";


export default function AddToCart({receiptId}) {
    const cartContext = useContext(CartContext)

    const addToCart = async () => {
        const order = {
            productId: receiptId,
            quantity: 1
        }

        try {
            await orderNoodle(order)
        } catch (error) {
            console.error("Error fetching noodles:", error);
        }

        try {
            const data = await getCartItems()
            cartContext.updateItems(data.orders)
            cartContext.updateTotalPrice(data.total)
        } catch (error) {
            console.error("Error fetching noodles:", error);
        }
    }

    return <button 
        type="button" 
        className="font-bangers bg-[#EECC0B] py-2 px-10 rounded-xl border-2 border-solid border-black shadow-md hover:cursor-pointer"
        onClick={addToCart}
    >
        Add to cart
    </button>
}