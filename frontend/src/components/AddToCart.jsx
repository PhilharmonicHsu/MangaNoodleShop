
import { useContext } from "react";
import { CartContext } from "@context/CartContextProvider";
import { v4 as uuidv4 } from 'uuid'

export default function AddToCart({targetReceipt}) {
    const cartContext = useContext(CartContext)

    const addToCart = async () => {
        const cartItems = cartContext.items;

        try {
            const targetItem = cartItems.find(
                cartItem => cartItem.receipt.id === targetReceipt.id
            )
    
            if (targetItem) {
                targetItem.quantity += 1;
            } else {
                const newCartItem = {
                    id: uuidv4(),
                    receipt: {
                        id: targetReceipt.id,
                        name: targetReceipt.name,
                        price: targetReceipt.price,
                        image: targetReceipt.image,
                    },
                    quantity: 1
                }
        
                cartItems.push(newCartItem)
            }       

            const totalPrice = cartItems.reduce(
                (currentResult, cartItem) => cartItem.receipt.price * cartItem.quantity + currentResult, 
                0
            )

            cartContext.updateItems(cartItems)
            cartContext.updateTotalPrice(totalPrice)
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