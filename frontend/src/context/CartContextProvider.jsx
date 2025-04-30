import {createContext, useState} from 'react'

export const CartContext = createContext({
  items: [],
  totalPrice: 0,
  isLogin: false,
})

export default function CartContextProvider({children}) {
    const [items, setItems] = useState(
        () => {
            try {
                return JSON.parse(localStorage.getItem('cartItems') || [])
            } catch (err) {
                return [];
            }
        }
    )
    const [totalPrice, setTotalPrice] = useState(
        () => localStorage.getItem('totalPrice') || 0
    )
    const [isLogin, setIslogin] = useState(false);
    
    const updateItems = (newItems) => {
        localStorage.setItem('cartItems', JSON.stringify(newItems))

        setItems(JSON.parse(localStorage.getItem('cartItems') || []));
    };

    const updateTotalPrice = (newTotalPrice) => {
        localStorage.setItem('totalPrice', newTotalPrice)

        setTotalPrice(localStorage.getItem('totalPrice'))
    }

    const toggleIsLogin = (value) => {
        setIslogin(value)
    }

    return (
        <CartContext.Provider value={
            {
                items, updateItems,
                totalPrice, updateTotalPrice,
                isLogin, toggleIsLogin
            }
        }>
            {children}
        </CartContext.Provider>
    );
}
