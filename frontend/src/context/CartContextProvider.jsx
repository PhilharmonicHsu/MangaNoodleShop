import {createContext, useState} from 'react'

export const CartContext = createContext({
  items: [],
  totalPrice: 0,
  isLogin: false,
})

export default function CartContextProvider({children}) {
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLogin, setIslogin] = useState(false);
    
    const updateItems = (newItems) => {
        setItems([...newItems]);
    };

    const updateTotalPrice = (newTotalPrice) => {
        setTotalPrice(newTotalPrice)
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
