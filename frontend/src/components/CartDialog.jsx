import { createPortal } from "react-dom";
import { forwardRef, useRef, useImperativeHandle, useContext } from "react";
import { getCartItems, updateOrder, removeOrder, order, cancel } from "@api/noodleApi";
import { CartContext } from "@context/CartContextProvider";
import { useNavigate } from "react-router-dom";

const CartDialog = forwardRef(({}, ref) => {
    const dialogRef = useRef()
    const cartDialog = document.getElementById("cart-dialog");
    const cartContext = useContext(CartContext)
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        open: async () => {
            dialogRef.current.showModal();
        }
    }));

    const handleUpdateItem = async (e, orderId) => {
        const data = {
            quantity: e.target.value
        }

        try {
            await updateOrder(orderId, data)
            const cartItems = await getCartItems()
            cartContext.updateItems(cartItems.orders)
            cartContext.updateTotalPrice(cartItems.total)
        } catch (error) {
            console.error(error)
        }
    }

    const handleRemoveItem = async (orderId) => {
        try {
            await removeOrder(orderId)
            const data = await getCartItems()
            cartContext.updateItems(data.orders)
            cartContext.updateTotalPrice(data.total)
        } catch (error) {
            console.error("Error fetching noodles:", error);
        }
    }

    const handleResetItem = async (isSubmit = false) => {
        if (isSubmit) {
            if (cartContext.items.length === 0) {
                alert('Cart is empty!')
    
                return
            }

            try {
                await order()
            } catch (error) {
                if (error.response.status === 301) {
                    alert('Please log in as a member first!')
                    navigate('/login')
                }
            }
        } else {
            await cancel()
        }

        try {
            const data = await getCartItems()
            cartContext.updateItems(data.orders)
            cartContext.updateTotalPrice(data.total)
        } catch (error) {
            console.error("Error fetching noodles:", error);
        }
    }

    return createPortal(
      <dialog ref={dialogRef} className="justify-self-center self-center rounded-xl border-4 bg-[#FCFCE3] w-full sm:w-5/6 md:w-3/5">
          <div className="relative px-10">
            <button 
                className="absolute top-0 right-0 w-10 h-10 flex justify-center items-center hover:cursor-pointer"
                onClick={() => dialogRef.current.close()}
            >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="black"/>
                    </svg>
                </button>
            <section 
                id="cart-header" 
                className="flex justify-center items-center"
            >
                <div className="font-bangers text-4xl p-4">
                   - Cart -
                </div>
            </section>
            {
                cartContext.items.length === 0
                ? 
                <div className="font-bangers text-xl text-center">
                   Your cart is empty
                </div>
                : <div className="flex flex-col gap-4">
                    {
                        cartContext.items.map((item, index) => {
                            return <div key={index} className="flex gap-4 justify-center items-center">
                                <img className="h-20 w-20 rounded-xl" src={`/receipts/${item.receipt.image}`} />
                                <div>
                                    <div className="text-2xl w-25 sm:w-30 md:w-40 lg:w-80">{item.receipt.name}</div>
                                    <div className="text-2xl">${item.receipt.price}</div>
                                </div>
                                <div className="text-2xl">-</div>
                                <div className="modify-quantity flex justify-center items-center gap-2">
                                    <input type="number" min="1" max="10" 
                                        className="text-2xl bg-white text-center border-1 rounded-md w-20" value={item.quantity} 
                                        onChange={(e) => handleUpdateItem(e, item.id)}
                                    />
                                    <button 
                                        className="bg-[#F41959] p-1 rounded-xl hover:cursor-pointer"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 9L17.16 17.398C17.033 18.671 16.97 19.307 16.68 19.788C16.4257 20.2114 16.0516 20.55 15.605 20.761C15.098 21 14.46 21 13.18 21H10.82C9.541 21 8.902 21 8.395 20.76C7.94805 20.5491 7.57361 20.2106 7.319 19.787C7.031 19.307 6.967 18.671 6.839 17.398L6 9M13.5 15.5V10.5M10.5 15.5V10.5M4.5 6.5H9.115M9.115 6.5L9.501 3.828C9.613 3.342 10.017 3 10.481 3H13.519C13.983 3 14.386 3.342 14.499 3.828L14.885 6.5M9.115 6.5H14.885M14.885 6.5H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        })
                    }
                </div>
            }
            
            <div className="text-3xl text-center py-4">
                Total: {cartContext.totalPrice}
            </div>
            <div id="button-area" className="flex justify-evenly mb-4">
                <button 
                    onClick={() => handleResetItem()}
                    className="font-bangers hover:cursor-pointer text-xl bg-[#F41959] px-4 sm:px-10 py-3 text-white rounded-xl border-3 border-black relative"
                >
                    Cancal Order
                    <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:8px_8px] opacity-40"></span>
                </button>
                <button 
                    onClick={() => handleResetItem(true)}
                    className="relative hover:cursor-pointer font-bangers text-xl bg-[#F4DC23] px-4 sm:px-10 py-3 rounded-xl border-3 border-black"
                >
                    Submit Order
                    <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:8px_8px] opacity-40"></span>
                </button>
            </div>
          </div>
      </dialog>,
      cartDialog
    );
})

export default CartDialog
